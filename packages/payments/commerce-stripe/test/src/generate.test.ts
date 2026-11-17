import test from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { cpSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const fixtures = join(here, '../fixtures')
const monorepoModules = join(here, '../../../../../node_modules')
const pikkuBin = join(
  dirname(createRequire(import.meta.url).resolve('@pikku/cli/package.json')),
  'dist/bin/pikku.js'
)

/**
 * A project that wires this addon the way a consumer does, so the real
 * `pikku db generate` plans from the declaration the addon published.
 * Needs the addon built (`bun run build`), since a consumer resolves
 * `.pikku/db/pikku-db-meta.gen.json` through the package name.
 */
const app = (legacyMigrations: boolean) => {
  const dir = mkdtempSync(join(tmpdir(), 'commerce-stripe-app-'))
  cpSync(join(fixtures, 'app'), dir, { recursive: true })
  symlinkSync(monorepoModules, join(dir, 'node_modules'))
  if (legacyMigrations) {
    mkdirSync(join(dir, 'db/sqlite'), { recursive: true })
    cpSync(join(fixtures, 'legacy'), join(dir, 'db/sqlite'), { recursive: true })
  }
  return dir
}

const pikku = (dir: string, ...args: string[]) => {
  const result = spawnSync('node', [pikkuBin, ...args], { cwd: dir, encoding: 'utf8' })
  return { status: result.status, output: `${result.stdout}${result.stderr}` }
}

const generate = (dir: string) => {
  assert.equal(pikku(dir, 'all').status, 0)
  return pikku(dir, 'db', 'generate')
}

const migrations = (dir: string) => readdirSync(join(dir, 'db/sqlite')).sort()

test('an app with an empty database creates all ten tables from the declaration', () => {
  const dir = app(false)
  try {
    const result = generate(dir)
    assert.equal(result.status, 0, result.output)
    const file = migrations(dir).find((f) => f.endsWith('-app-tables.sql'))!
    const sql = readFileSync(join(dir, 'db/sqlite', file), 'utf8')
    const created = [...sql.matchAll(/create table "(payment_\w+)"/g)].map((m) => m[1]).sort()
    assert.deepEqual(created, [
      'payment_cart',
      'payment_cart_item',
      'payment_customer',
      'payment_order',
      'payment_order_item',
      'payment_product',
      'payment_refund',
      'payment_shipping_rate',
      'payment_variant',
      'payment_webhook_event',
    ])
    assert.doesNotMatch(sql, /\b(alter|drop)\b/i)
    assert.equal(pikku(dir, 'db', 'migrate').status, 0)
    assert.equal(pikku(dir, 'db', 'check').status, 0)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('a database made by the old SQL keeps its tables and is told what stripe_account needs', () => {
  const dir = app(true)
  try {
    assert.equal(pikku(dir, 'all').status, 0)
    pikku(dir, 'db', 'migrate')
    const result = generate(dir)
    assert.ok(!migrations(dir).some((f) => f.endsWith('-app-tables.sql')))
    const refused = result.output.split('\n').filter((l) => /differs from the migrations/.test(l))
    assert.deepEqual(
      refused.map((l) => l.trim().split(' ')[0]),
      ['payment_cart.stripe_account', 'payment_customer.stripe_account', 'payment_order.stripe_account']
    )
    assert.doesNotMatch(result.output, /createTable|create table "payment_/i)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
