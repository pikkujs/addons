import assert from 'node:assert/strict'
import { test } from 'node:test'
import { listShippingRates, saveShippingRate } from '@pikku/addon-stripe-commerce'
import { createServices, createTestDb } from './harness.js'

const standard = { name: 'Standard', amountMinor: 499, currency: 'eur' }

test('saving a rate mirrors it onto Stripe as a fixed amount', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, {
    replies: { '/shipping_rates': { id: 'shr_1' } },
  })

  const result = await saveShippingRate.func(services, standard, {} as any)

  assert.equal(result?.stripeShippingRateId, 'shr_1')
  assert.equal(posts[0]!.path, '/shipping_rates')
  assert.equal(posts[0]!.body.display_name, 'Standard')
  assert.equal(posts[0]!.body.type, 'fixed_amount')
  assert.deepEqual(posts[0]!.body.fixed_amount, { amount: 499, currency: 'eur' })
  assert.equal(posts[0]!.body.delivery_estimate, undefined)
})

test('delivery estimates are sent in business days, either bound alone', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, {
    replies: { '/shipping_rates': { id: 'shr_1' } },
  })

  await saveShippingRate.func(
    services,
    { ...standard, deliveryMinDays: 2, deliveryMaxDays: 5 },
    {} as any
  )
  await saveShippingRate.func(services, { ...standard, deliveryMaxDays: 5 }, {} as any)

  assert.deepEqual(posts[0]!.body.delivery_estimate, {
    minimum: { unit: 'business_day', value: 2 },
    maximum: { unit: 'business_day', value: 5 },
  })
  assert.deepEqual(posts[1]!.body.delivery_estimate, {
    maximum: { unit: 'business_day', value: 5 },
  })
})

test('free shipping is a zero-amount rate, not an absent one', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, {
    replies: { '/shipping_rates': { id: 'shr_1' } },
  })

  await saveShippingRate.func(
    services,
    { name: 'Free', amountMinor: 0, currency: 'eur' },
    {} as any
  )

  assert.deepEqual(posts[0]!.body.fixed_amount, { amount: 0, currency: 'eur' })
})

test('editing a rate creates a replacement and repoints the row', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, {
    replies: { '/shipping_rates': { id: 'shr_2' } },
  })
  const first = await saveShippingRate.func(services, standard, {} as any)

  const second = await saveShippingRate.func(
    services,
    { ...standard, id: first!.id, amountMinor: 599 },
    {} as any
  )

  assert.equal(second!.id, first!.id)
  assert.equal(posts.length, 2)

  const rows = await kysely.selectFrom('paymentShippingRate').selectAll().execute()
  assert.equal(rows.length, 1)
  assert.equal(rows[0]!.amountMinor, 599)
  assert.equal(rows[0]!.stripeShippingRateId, 'shr_2')
})

test('a failed push still saves the rate with a null mirror', async () => {
  const kysely = createTestDb()
  const { services, logger } = createServices(kysely, { fail: '/shipping_rates' })

  const result = await saveShippingRate.func(services, standard, {} as any)

  assert.equal(result?.stripeShippingRateId, null)
  assert.match(logger.warned[0]!, /checkout will retry it/)
  const rows = await kysely.selectFrom('paymentShippingRate').selectAll().execute()
  assert.equal(rows.length, 1)
})

test('editing an unknown rate is refused', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)
  await assert.rejects(
    () => saveShippingRate.func(services, { ...standard, id: 'nope' }, {} as any),
    /Unknown shipping rate/
  )
})

test('listShippingRates returns active rates in position order, retired ones on request', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, {
    replies: { '/shipping_rates': { id: 'shr_1' } },
  })
  await saveShippingRate.func(
    services,
    { name: 'Express', amountMinor: 999, currency: 'eur', position: 1, deliveryMaxDays: 1 },
    {} as any
  )
  await saveShippingRate.func(services, { ...standard, position: 0 }, {} as any)
  const retired = await saveShippingRate.func(
    services,
    { name: 'Pigeon', amountMinor: 1, currency: 'eur', position: 2, active: false },
    {} as any
  )

  const active = await listShippingRates.func(services, {}, {} as any)
  assert.deepEqual(active?.rates.map((r) => r.name), ['Standard', 'Express'])
  assert.equal(active?.rates[1]!.deliveryMaxDays, 1)
  assert.equal(active?.rates[0]!.deliveryMinDays, null)

  const all = await listShippingRates.func(services, { includeInactive: true }, {} as any)
  assert.equal(all?.rates.length, 3)
  assert.equal(all?.rates.find((r) => r.id === retired!.id)!.active, false)
})
