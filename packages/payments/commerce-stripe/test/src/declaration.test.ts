import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import SQLite from 'better-sqlite3'
import { tables } from '../../db/tables.js'
import { createSqlite } from './harness.js'

const LEGACY = fileURLToPath(new URL('../fixtures/legacy/', import.meta.url))

const legacySqlite = () => {
  const sqlite = new SQLite(':memory:')
  for (const file of readdirSync(LEGACY).filter((f) => f.endsWith('.sql')).sort()) {
    sqlite.exec(readFileSync(LEGACY + file, 'utf8'))
  }
  return sqlite
}

const shape = (sqlite: SQLite.Database) => {
  const names = (
    sqlite
      .prepare(`select name from sqlite_master where type = 'table' and name like 'payment_%' order by name`)
      .all() as { name: string }[]
  ).map((r) => r.name)
  return Object.fromEntries(
    names.map((table) => {
      const columns = (
        sqlite.prepare(`pragma table_info(${table})`).all() as {
          name: string
          type: string
          notnull: number
          dflt_value: string | null
          pk: number
        }[]
      ).map((c) => ({
        name: c.name,
        type: c.type,
        // SQLite does not enforce NOT NULL on a non-integer primary key.
        notnull: c.pk ? 1 : c.notnull,
        dflt: c.dflt_value,
        pk: c.pk,
      }))
      const indexes = (
        sqlite.prepare(`pragma index_list(${table})`).all() as {
          name: string
          unique: number
          origin: string
        }[]
      )
        .filter((i) => i.origin === 'c')
        .map((i) => ({
          name: i.name,
          unique: i.unique,
          columns: (sqlite.prepare(`pragma index_info(${i.name})`).all() as { name: string }[]).map(
            (c) => c.name
          ),
        }))
      return [
        table,
        {
          columns: columns.sort((a, b) => a.name.localeCompare(b.name)),
          indexes: indexes.sort((a, b) => a.name.localeCompare(b.name)),
        },
      ]
    })
  )
}

test('the declaration creates the tables the old SQL created, apart from stripe_account', () => {
  const declared = shape(createSqlite())
  const legacy = shape(legacySqlite())
  assert.equal(Object.keys(declared).length, 10)
  assert.deepEqual(Object.keys(declared), Object.keys(legacy))

  // The one deliberate change: stripe_account is required, '' is the default
  // account, and the owner index is a plain unique index over its columns.
  for (const table of ['payment_customer', 'payment_cart', 'payment_order']) {
    const column = legacy[table].columns.find((c) => c.name === 'stripe_account')!
    assert.equal(column.notnull, 0)
    Object.assign(column, { notnull: 1, dflt: "''" })
  }
  const owner = legacy.payment_customer.indexes.find((i) => i.name === 'payment_customer_owner_unique')!
  assert.deepEqual(owner.columns, ['owner_type', 'owner_id', null])
  owner.columns = ['owner_type', 'owner_id', 'stripe_account']

  assert.deepEqual(declared, legacy)
})

test("the default account is '' and is unique per owner", () => {
  const sqlite = createSqlite()
  const insert = (id: string, account?: string) =>
    sqlite
      .prepare(
        `insert into payment_customer (id, owner_type, owner_id, stripe_customer_id, created_at${account === undefined ? '' : ', stripe_account'})
         values (?, 'user', 'ada', ?, 'now'${account === undefined ? '' : ', ?'})`
      )
      .run(...(account === undefined ? [id, `cus_${id}`] : [id, `cus_${id}`, account]))
  insert('a')
  assert.equal(sqlite.prepare(`select stripe_account as a from payment_customer`).get()?.['a' as never], '')
  assert.throws(() => insert('b'), /UNIQUE/)
  assert.throws(() => insert('c', ''), /UNIQUE/)
  insert('d', 'eu')
})

test('the declaration follows the rules for an addon', () => {
  const identifier = /^[A-Za-z_][A-Za-z0-9_]{0,62}$/
  for (const [table, declaration] of Object.entries(tables) as [string, any][]) {
    assert.match(table, /^payment[A-Z]/)
    assert.equal(declaration.declareOnly, undefined)
    for (const [column, spec] of Object.entries(declaration.columns) as [string, any][]) {
      assert.match(column, identifier)
      assert.notEqual(spec.security, 'public', `${table}.${column}`)
    }
  }
})
