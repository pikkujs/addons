import assert from 'node:assert/strict'
import { test } from 'node:test'
import { listSubscriptions } from '@pikku/addon-payment-stripe'
import { createServices, createTestDb } from './harness.js'

const seedSubscription = async (
  kysely: ReturnType<typeof createTestDb>,
  row: { stripeSubscriptionId: string; status: string; cancelAtPeriodEnd?: 0 | 1 }
) => {
  const now = new Date().toISOString()
  await kysely
    .insertInto('paymentSubscription')
    .values({
      id: crypto.randomUUID(),
      customerId: null,
      stripeSubscriptionId: row.stripeSubscriptionId,
      stripePriceId: 'price_1',
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
