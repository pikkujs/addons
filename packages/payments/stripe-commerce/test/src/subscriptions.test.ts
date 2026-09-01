import assert from 'node:assert/strict'
import { test } from 'node:test'
import { listSubscriptions } from '@pikku/addon-stripe-commerce'
import { createServices, createTestDb } from './harness.js'

const seedSubscription = async (
  kysely: ReturnType<typeof createTestDb>,
  row: {
    stripeSubscriptionId: string
    status: string
    cancelAtPeriodEnd?: 0 | 1
    variantId?: string | null
  }
) => {
  const now = new Date().toISOString()
  await kysely
    .insertInto('paymentSubscription')
    .values({
      id: crypto.randomUUID(),
      customerId: null,
      stripeSubscriptionId: row.stripeSubscriptionId,
      stripePriceId: 'price_1',
      variantId: row.variantId ?? null,
      status: row.status,
      currentPeriodEnd: '2026-09-30T00:00:00.000Z',
      cancelAtPeriodEnd: row.cancelAtPeriodEnd ?? 0,
      createdAt: now,
      updatedAt: now,
    })
    .execute()
}

test('lists subscriptions with the cancel flag as a boolean', async () => {
  const kysely = createTestDb()
  await seedSubscription(kysely, { stripeSubscriptionId: 'sub_1', status: 'active' })
  await seedSubscription(kysely, {
    stripeSubscriptionId: 'sub_2',
    status: 'active',
    cancelAtPeriodEnd: 1,
  })
  const { services } = createServices(kysely)

  const rows = await listSubscriptions.func(services, {}, {} as any)

  assert.equal(rows?.length, 2)
  assert.equal(rows?.find((r) => r.stripeSubscriptionId === 'sub_1')!.cancelAtPeriodEnd, false)
  assert.equal(rows?.find((r) => r.stripeSubscriptionId === 'sub_2')!.cancelAtPeriodEnd, true)
  assert.equal(rows?.[0]!.currentPeriodEnd, '2026-09-30T00:00:00.000Z')
})

test('filters by Stripe status and limits', async () => {
  const kysely = createTestDb()
  await seedSubscription(kysely, { stripeSubscriptionId: 'sub_1', status: 'active' })
  await seedSubscription(kysely, { stripeSubscriptionId: 'sub_2', status: 'past_due' })
  const { services } = createServices(kysely)

  const pastDue = await listSubscriptions.func(services, { status: 'past_due' }, {} as any)
  assert.deepEqual(pastDue?.map((r) => r.stripeSubscriptionId), ['sub_2'])

  const limited = await listSubscriptions.func(services, { limit: 1 }, {} as any)
  assert.equal(limited?.length, 1)
})

test('storefront sales and plan subscriptions from elsewhere can be told apart', async () => {
  const kysely = createTestDb()
  await seedSubscription(kysely, {
    stripeSubscriptionId: 'sub_shop',
    status: 'active',
    variantId: 'variant_1',
  })
  await seedSubscription(kysely, { stripeSubscriptionId: 'sub_plan', status: 'active' })
  const { services } = createServices(kysely)

  const shop = await listSubscriptions.func(services, { storefront: true }, {} as any)
  assert.deepEqual(shop?.map((r) => r.stripeSubscriptionId), ['sub_shop'])

  const plans = await listSubscriptions.func(services, { storefront: false }, {} as any)
  assert.deepEqual(plans?.map((r) => r.stripeSubscriptionId), ['sub_plan'])

  const both = await listSubscriptions.func(services, {}, {} as any)
  assert.equal(both?.length, 2)
})

test('a signed-in caller only sees the subscriptions on their own customer', async () => {
  const kysely = createTestDb()
  await kysely
    .insertInto('paymentCustomer')
    .values({
      id: 'cust_1',
      ownerType: 'user',
      ownerId: 'user_1',
      stripeCustomerId: 'cus_1',
      email: null,
      createdAt: new Date().toISOString(),
    })
    .execute()
  await seedSubscription(kysely, { stripeSubscriptionId: 'sub_mine', status: 'active' })
  await kysely
    .updateTable('paymentSubscription')
    .set({ customerId: 'cust_1' })
    .where('stripeSubscriptionId', '=', 'sub_mine')
    .execute()
  await seedSubscription(kysely, { stripeSubscriptionId: 'sub_theirs', status: 'active' })
  const { services } = createServices(kysely)

  const mine = await listSubscriptions.func(services, {}, { session: { userId: 'user_1' } } as any)
  assert.deepEqual(
    mine.map((row) => row.stripeSubscriptionId),
    ['sub_mine']
  )

  const all = await listSubscriptions.func(services, {}, {} as any)
  assert.equal(all.length, 2)
})
