import assert from 'node:assert/strict'
import { test } from 'node:test'
import { fulfillOrder, getOrder, listOrders, refundOrder } from '@pikku/addon-payment-stripe'
import { createServices, createTestDb, seedCartOrder, seedProduct } from './harness.js'

const paid = async (
  kysely: ReturnType<typeof createTestDb>,
  orderId: string,
  set: Record<string, unknown> = {}
) =>
  kysely
    .updateTable('paymentOrder')
    .set({ status: 'paid', stripePaymentIntentId: 'pi_123', amountMinor: 5000, ...(set as any) })
    .where('id', '=', orderId)
    .execute()

test('a full refund refunds what remains, marks the order refunded and restocks', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId, { quantity: 2 })
  await paid(kysely, orderId)
  const { services, posts } = createServices(kysely, { replies: { '/refunds': { id: 're_1' } } })

  const result = await refundOrder.func(services, { id: orderId }, {} as any)

  assert.deepEqual(result, {
    id: orderId,
    refundId: 're_1',
    amountRefundedMinor: 5000,
    status: 'refunded',
  })
  assert.equal(posts[0]!.path, '/refunds')
  assert.deepEqual(posts[0]!.body, { payment_intent: 'pi_123', amount: 5000 })
  assert.equal(posts[0]!.idempotencyKey, `refund_${orderId}_0_5000`)

  const variant = await kysely
    .selectFrom('paymentVariant')
    .select(['stock'])
    .where('id', '=', variantId)
    .executeTakeFirstOrThrow()
  assert.equal(variant.stock, 12)
})

test('a partial refund leaves the order paid and does not restock by default', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId, { quantity: 2 })
  await paid(kysely, orderId)
  const { services, posts } = createServices(kysely, { replies: { '/refunds': { id: 're_1' } } })

  const result = await refundOrder.func(services, { id: orderId, amountMinor: 1500 }, {} as any)

  assert.equal(result?.status, 'paid')
  assert.equal(result?.amountRefundedMinor, 1500)
  assert.equal(posts[0]!.body.amount, 1500)

  const variant = await kysely
    .selectFrom('paymentVariant')
    .select(['stock'])
    .where('id', '=', variantId)
    .executeTakeFirstOrThrow()
  assert.equal(variant.stock, 10)
})

test('a partial refund can restock on request', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId, { quantity: 2 })
  await paid(kysely, orderId)
  const { services } = createServices(kysely, { replies: { '/refunds': { id: 're_1' } } })

  await refundOrder.func(services, { id: orderId, amountMinor: 1500, restock: true }, {} as any)

  const variant = await kysely
    .selectFrom('paymentVariant')
    .select(['stock'])
    .where('id', '=', variantId)
    .executeTakeFirstOrThrow()
  assert.equal(variant.stock, 12)
})

test('a full refund can decline to restock — a returned item may be unsellable', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId, { quantity: 2 })
  await paid(kysely, orderId)
  const { services } = createServices(kysely, { replies: { '/refunds': { id: 're_1' } } })

  await refundOrder.func(services, { id: orderId, restock: false }, {} as any)

  const variant = await kysely
    .selectFrom('paymentVariant')
    .select(['stock'])
    .where('id', '=', variantId)
    .executeTakeFirstOrThrow()
  assert.equal(variant.stock, 10)
})

test('successive partial refunds accumulate and the last one closes the order', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId)
  await paid(kysely, orderId)
  const { services, posts } = createServices(kysely, { replies: { '/refunds': { id: 're_1' } } })

  await refundOrder.func(services, { id: orderId, amountMinor: 2000 }, {} as any)
  const second = await refundOrder.func(services, { id: orderId, amountMinor: 3000 }, {} as any)

  assert.equal(second?.amountRefundedMinor, 5000)
  assert.equal(second?.status, 'refunded')
  assert.equal(posts[0]!.idempotencyKey, `refund_${orderId}_0_2000`)
  assert.equal(posts[1]!.idempotencyKey, `refund_${orderId}_2000_3000`)
})

test('a refund reason is passed to Stripe for its fraud signals', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId)
  await paid(kysely, orderId)
  const { services, posts } = createServices(kysely, { replies: { '/refunds': { id: 're_1' } } })

  await refundOrder.func(services, { id: orderId, reason: 'fraudulent' }, {} as any)

  assert.equal(posts[0]!.body.reason, 'fraudulent')
})

test('refuses to refund more than remains', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId)
  await paid(kysely, orderId, { amountRefundedMinor: 4000 })
  const { services, posts } = createServices(kysely)

  await assert.rejects(
    () => refundOrder.func(services, { id: orderId, amountMinor: 2000 }, {} as any),
    /only 1000 remains/
  )
  assert.equal(posts.length, 0)
})

test('refuses to refund an order that is already fully refunded', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId)
  await paid(kysely, orderId, { amountRefundedMinor: 5000 })
  const { services } = createServices(kysely)

  await assert.rejects(
    () => refundOrder.func(services, { id: orderId }, {} as any),
    /already fully refunded/
  )
})

test('refuses to refund an order that never took a payment', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId)
  const { services } = createServices(kysely)

  await assert.rejects(
    () => refundOrder.func(services, { id: orderId }, {} as any),
    /no payment to refund/
  )
})

test('refunding an unknown order is a not-found', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)
  await assert.rejects(
    () => refundOrder.func(services, { id: 'nope' }, {} as any),
    /Unknown order/
  )
})

test('fulfilling a paid order records tracking and the ship date', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId)
  await paid(kysely, orderId)
  const { services } = createServices(kysely)

  const result = await fulfillOrder.func(
    services,
    { id: orderId, trackingNumber: 'RR123', trackingUrl: 'https://track/RR123' },
    {} as any
  )

  assert.equal(result?.fulfillmentStatus, 'fulfilled')
  assert.ok(result?.shippedAt)

  const order = await kysely
    .selectFrom('paymentOrder')
    .select(['fulfillmentStatus', 'trackingNumber', 'trackingUrl', 'shippedAt'])
    .where('id', '=', orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.fulfillmentStatus, 'fulfilled')
  assert.equal(order.trackingNumber, 'RR123')
  assert.equal(order.trackingUrl, 'https://track/RR123')
  assert.equal(order.shippedAt, result?.shippedAt)
})

test('refuses to fulfil an order whose money has not arrived', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId)
  await kysely
    .updateTable('paymentOrder')
    .set({ status: 'processing' })
    .where('id', '=', orderId)
    .execute()
  const { services } = createServices(kysely)

  await assert.rejects(
    () => fulfillOrder.func(services, { id: orderId }, {} as any),
    /is processing, not paid/
  )
})

test('refuses to fulfil an order with nothing that ships', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId)
  await paid(kysely, orderId, { fulfillmentStatus: 'not_required' })
  const { services } = createServices(kysely)

  await assert.rejects(
    () => fulfillOrder.func(services, { id: orderId }, {} as any),
    /nothing that ships/
  )
})

test('fulfilling an unknown order is a not-found', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)
  await assert.rejects(
    () => fulfillOrder.func(services, { id: 'nope' }, {} as any),
    /Unknown order/
  )
})

test('listOrders filters by status, fulfilment, email and dispute', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const a = await seedCartOrder(kysely, variantId)
  const b = await seedCartOrder(kysely, variantId)
  const c = await seedCartOrder(kysely, variantId)
  await paid(kysely, a.orderId, { email: 'ada@example.com' })
  await kysely
    .updateTable('paymentOrder')
    .set({ status: 'paid', fulfillmentStatus: 'fulfilled', disputeStatus: 'open' })
    .where('id', '=', b.orderId)
    .execute()
  await kysely
    .updateTable('paymentOrder')
    .set({ status: 'expired' })
    .where('id', '=', c.orderId)
    .execute()
  const { services } = createServices(kysely)

  const all = await listOrders.func(services, {}, {} as any)
  assert.equal(all?.length, 3)

  const paidOnly = await listOrders.func(services, { status: 'paid' }, {} as any)
  assert.deepEqual(paidOnly?.map((o) => o.id).sort(), [a.orderId, b.orderId].sort())

  const queue = await listOrders.func(services, { fulfillmentStatus: 'unfulfilled' }, {} as any)
  assert.equal(queue?.every((o) => o.fulfillmentStatus === 'unfulfilled'), true)

  const byEmail = await listOrders.func(services, { email: 'ada@example.com' }, {} as any)
  assert.deepEqual(byEmail?.map((o) => o.id), [a.orderId])

  const disputed = await listOrders.func(services, { disputed: true }, {} as any)
  assert.deepEqual(disputed?.map((o) => o.id), [b.orderId])
})

test('listOrders can find the manual-capture queue', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId, { captureMethod: 'manual' })
  await kysely
    .updateTable('paymentOrder')
    .set({ status: 'authorized' })
    .where('id', '=', orderId)
    .execute()
  const { services } = createServices(kysely)

  const authorized = await listOrders.func(services, { status: 'authorized' }, {} as any)
  assert.deepEqual(authorized?.map((o) => o.id), [orderId])
})

test('listOrders pages', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  await seedCartOrder(kysely, variantId)
  await seedCartOrder(kysely, variantId)
  const { services } = createServices(kysely)

  const page = await listOrders.func(services, { limit: 1, offset: 1 }, {} as any)
  assert.equal(page?.length, 1)
})

test('getOrder returns line items with a computed line total', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId, { quantity: 3 })
  const { services } = createServices(kysely)

  const order = await getOrder.func(services, { id: orderId }, {} as any)

  assert.equal(order?.items.length, 1)
  assert.equal(order?.items[0]!.quantity, 3)
  assert.equal(order?.items[0]!.unitAmountMinor, 2500)
  assert.equal(order?.items[0]!.lineAmountMinor, 7500)
  assert.equal(order?.items[0]!.requiresShipping, true)
})

test('getOrder omits a shipping address until one is collected', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId)
  const { services } = createServices(kysely)

  const before = await getOrder.func(services, { id: orderId }, {} as any)
  assert.equal(before?.shipping, null)

  await kysely
    .updateTable('paymentOrder')
    .set({
      shippingName: 'Ada',
      shippingLine1: '1 Main St',
      shippingCity: 'Berlin',
      shippingPostalCode: '10115',
      shippingCountry: 'DE',
    })
    .where('id', '=', orderId)
    .execute()

  const after = await getOrder.func(services, { id: orderId }, {} as any)
  assert.equal(after?.shipping?.name, 'Ada')
  assert.equal(after?.shipping?.line1, '1 Main St')
  assert.equal(after?.shipping?.country, 'DE')
  assert.equal(after?.shipping?.line2, null)
})

test('getting an unknown order is a not-found', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)
  await assert.rejects(
    () => getOrder.func(services, { id: 'nope' }, {} as any),
    /Unknown order/
  )
})

test('orders can be listed for one owner', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)
  const { variantId } = await seedProduct(kysely)

  const customerId = crypto.randomUUID()
  await kysely
    .insertInto('paymentCustomer')
    .values({
      id: customerId,
      ownerType: 'organization',
      ownerId: 'org_1',
      stripeCustomerId: 'cus_1',
      email: null,
      createdAt: new Date().toISOString(),
    })
    .execute()

  const { orderId } = await seedCartOrder(kysely, variantId)
  await seedCartOrder(kysely, variantId)
  await kysely
    .updateTable('paymentOrder')
    .set({ customerId })
    .where('id', '=', orderId)
    .execute()

  const mine = await listOrders.func(
    services,
    { ownerType: 'organization', ownerId: 'org_1' },
    {} as any
  )
  assert.deepEqual(
    mine.map((order) => order.id),
    [orderId]
  )

  const asUser = await listOrders.func(services, { ownerType: 'user', ownerId: 'org_1' }, {} as any)
  assert.equal(asUser.length, 0)

  const defaultType = await listOrders.func(services, { ownerId: 'org_1' }, {} as any)
  assert.equal(defaultType.length, 0)
})
