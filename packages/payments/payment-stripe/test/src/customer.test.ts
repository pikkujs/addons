import assert from 'node:assert/strict'
import test from 'node:test'
import { ensureCustomer, StripeApi } from '@pikku/addon-payment-stripe'
import { createTestDb } from './harness.js'

const realFetch = globalThis.fetch

/** Counts what actually reached Stripe, which is the point of the dedupe. */
const stubStripe = () => {
  const posts: string[] = []
  let n = 0
  globalThis.fetch = (async (url: any) => {
    posts.push(String(url))
    return new Response(JSON.stringify({ id: `cus_${++n}` }), { status: 200 })
  }) as typeof fetch
  return { posts, restore: () => { globalThis.fetch = realFetch } }
}

const api = new StripeApi('sk_test_123')

const countCustomers = async (kysely: any) =>
  (await kysely.selectFrom('paymentCustomer').selectAll().execute()).length

test('a repeat buyer reuses one Stripe customer', async (t) => {
  const stripe = stubStripe()
  t.after(stripe.restore)
  const kysely = createTestDb()

  const owner = { type: 'user', id: 'user_1' }
  const first = await ensureCustomer(api, kysely, owner, 'a@example.com')
  const second = await ensureCustomer(api, kysely, owner, 'a@example.com')

  assert.equal(first?.stripeCustomerId, 'cus_1')
  assert.equal(second?.stripeCustomerId, 'cus_1')
  assert.equal(stripe.posts.length, 1)
  assert.equal(await countCustomers(kysely), 1)
})

test('a guest who later signs in keeps their Stripe customer', async (t) => {
  const stripe = stubStripe()
  t.after(stripe.restore)
  const kysely = createTestDb()

  const guest = await ensureCustomer(api, kysely, null, 'guest@example.com')
  const signedIn = await ensureCustomer(
    api,
    kysely,
    { type: 'user', id: 'user_9' },
    'guest@example.com'
  )

  assert.equal(signedIn?.stripeCustomerId, guest?.stripeCustomerId)
  assert.equal(stripe.posts.length, 1)
  assert.equal(await countCustomers(kysely), 1)

  const row = await kysely.selectFrom('paymentCustomer').selectAll().executeTakeFirstOrThrow()
  assert.equal(row.ownerType, 'user')
  assert.equal(row.ownerId, 'user_9')
})

test('a different email is a different customer', async (t) => {
  const stripe = stubStripe()
  t.after(stripe.restore)
  const kysely = createTestDb()

  await ensureCustomer(api, kysely, null, 'a@example.com')
  await ensureCustomer(api, kysely, null, 'b@example.com')

  assert.equal(stripe.posts.length, 2)
  assert.equal(await countCustomers(kysely), 2)
})

test('an email already claimed by a signed-in user does not hijack their customer', async (t) => {
  const stripe = stubStripe()
  t.after(stripe.restore)
  const kysely = createTestDb()

  const owner = await ensureCustomer(
    api,
    kysely,
    { type: 'user', id: 'user_1' },
    'shared@example.com'
  )
  const stranger = await ensureCustomer(api, kysely, null, 'shared@example.com')

  assert.notEqual(stranger?.stripeCustomerId, owner?.stripeCustomerId)
  assert.equal(await countCustomers(kysely), 2)
})

test('an anonymous checkout creates no customer at all', async (t) => {
  const stripe = stubStripe()
  t.after(stripe.restore)
  const kysely = createTestDb()

  assert.equal(await ensureCustomer(api, kysely, null), null)
  assert.equal(stripe.posts.length, 0)
  assert.equal(await countCustomers(kysely), 0)
})

test('an owner that already holds a Stripe customer is adopted, never minted again', async (t) => {
  const stripe = stubStripe()
  t.after(stripe.restore)
  const kysely = createTestDb()

  const owner = { type: 'organization', id: 'org_1', stripeCustomerId: 'cus_better_auth' }
  const first = await ensureCustomer(api, kysely, owner)
  const second = await ensureCustomer(api, kysely, owner)

  assert.equal(first?.stripeCustomerId, 'cus_better_auth')
  assert.equal(second?.id, first?.id)
  assert.equal(stripe.posts.length, 0)
  assert.equal(await countCustomers(kysely), 1)
})

test('two organisations are two customers, and an owner carries its own email', async (t) => {
  const stripe = stubStripe()
  t.after(stripe.restore)
  const kysely = createTestDb()

  await ensureCustomer(api, kysely, { type: 'organization', id: 'org_1', email: 'one@example.com' })
  await ensureCustomer(api, kysely, { type: 'organization', id: 'org_2', email: 'two@example.com' })

  assert.equal(stripe.posts.length, 2)
  const rows = await kysely.selectFrom('paymentCustomer').select(['ownerId', 'email']).execute()
  assert.deepEqual(
    rows.map((row) => [row.ownerId, row.email]).sort(),
    [['org_1', 'one@example.com'], ['org_2', 'two@example.com']]
  )
})

test('a user and an organization with the same id are different customers', async (t) => {
  const stripe = stubStripe()
  t.after(stripe.restore)
  const kysely = createTestDb()

  const asUser = await ensureCustomer(api, kysely, { type: 'user', id: 'shared_1' })
  const asOrg = await ensureCustomer(api, kysely, { type: 'organization', id: 'shared_1' })

  assert.notEqual(asUser?.id, asOrg?.id)
  assert.equal(await countCustomers(kysely), 2)
})
