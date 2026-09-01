import assert from 'node:assert/strict'
import test from 'node:test'
import SQLite from 'better-sqlite3'
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely'
import { BetterAuthPaymentOwner, SessionPaymentOwner } from '@pikku/addon-stripe-commerce'

test('the default owner is the session user', async () => {
  const owner = new SessionPaymentOwner()
  assert.deepEqual(await owner.resolve({ userId: 'user_1' }), { type: 'user', id: 'user_1' })
})

test('an organization-billed app resolves the session org instead', async () => {
  const owner = new SessionPaymentOwner('organization')
  assert.deepEqual(await owner.resolve({ userId: 'user_1', orgId: 'org_1' }), {
    type: 'organization',
    id: 'org_1',
  })
  assert.equal(await owner.resolve({ userId: 'user_1' }), null)
})

test('an anonymous visitor has no owner', async () => {
  assert.equal(await new SessionPaymentOwner().resolve(), null)
  assert.equal(await new SessionPaymentOwner().resolve({}), null)
})

const betterAuthDb = () => {
  const sqlite = new SQLite(':memory:')
  sqlite.exec(`
    CREATE TABLE user (id TEXT PRIMARY KEY, email TEXT, stripe_customer_id TEXT);
    CREATE TABLE organization (id TEXT PRIMARY KEY, stripe_customer_id TEXT);
  `)
  return new Kysely<any>({
    dialect: new SqliteDialect({ database: sqlite }),
    plugins: [new CamelCasePlugin()],
  })
}

test("better-auth's stripe customer is picked up rather than minted again", async () => {
  const kysely = betterAuthDb()
  await kysely
    .insertInto('user')
    .values({ id: 'user_1', email: 'ada@example.com', stripeCustomerId: 'cus_ba' })
    .execute()

  const owner = new BetterAuthPaymentOwner(kysely)
  assert.deepEqual(await owner.resolve({ userId: 'user_1' }), {
    type: 'user',
    id: 'user_1',
    email: 'ada@example.com',
    stripeCustomerId: 'cus_ba',
  })
})

test('an organization-billed app reads the org row', async () => {
  const kysely = betterAuthDb()
  await kysely
    .insertInto('organization')
    .values({ id: 'org_1', stripeCustomerId: 'cus_org' })
    .execute()

  const owner = new BetterAuthPaymentOwner(kysely, 'organization')
  assert.deepEqual(await owner.resolve({ userId: 'user_1', orgId: 'org_1' }), {
    type: 'organization',
    id: 'org_1',
    email: null,
    stripeCustomerId: 'cus_org',
  })
})

test('a user better-auth has no customer for is still an owner', async () => {
  const kysely = betterAuthDb()
  await kysely
    .insertInto('user')
    .values({ id: 'user_1', email: null, stripeCustomerId: null })
    .execute()

  const owner = new BetterAuthPaymentOwner(kysely)
  assert.deepEqual(await owner.resolve({ userId: 'user_1' }), {
    type: 'user',
    id: 'user_1',
    email: null,
    stripeCustomerId: null,
  })
})

test('an app with no better-auth stripe plugin degrades to the session, once', async () => {
  const sqlite = new SQLite(':memory:')
  const kysely = new Kysely<any>({
    dialect: new SqliteDialect({ database: sqlite }),
    plugins: [new CamelCasePlugin()],
  })
  const logger = { debugged: [] as string[], debug(m: string) { this.debugged.push(m) } }

  const owner = new BetterAuthPaymentOwner(kysely, 'user', logger)
  assert.deepEqual(await owner.resolve({ userId: 'user_1' }), { type: 'user', id: 'user_1' })
  assert.deepEqual(await owner.resolve({ userId: 'user_2' }), { type: 'user', id: 'user_2' })
  assert.equal(logger.debugged.length, 1)
})

test('an anonymous visitor is never looked up', async () => {
  const kysely = betterAuthDb()
  assert.equal(await new BetterAuthPaymentOwner(kysely).resolve(), null)
})
