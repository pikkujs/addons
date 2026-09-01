import assert from 'node:assert/strict'
import { test } from 'node:test'
import { captureOrder } from '@pikku/addon-stripe-commerce'
import { createTestDb, seedCartOrder, seedProduct } from './harness.js'

type Post = { path: string; body: Record<string, unknown>; idempotencyKey?: string }

const stripeApi = (posts: Post[]) => ({
  post: async (path: string, body: Record<string, unknown>, idempotencyKey?: string) => {
    posts.push({ path, body, idempotencyKey })
    return { id: 'pi_123', status: 'succeeded' }
  },
})

const authorize = async (
  kysely: Awaited<ReturnType<typeof createTestDb>>,
  orderId: string,
  amountMinor = 5000
) =>
  kysely
    .updateTable('paymentOrder')
    .set({ status: 'authorized', stripePaymentIntentId: 'pi_123', amountMinor })
    .where('id', '=', orderId)
    .execute()

const capture = (kysely: unknown, posts: Post[], data: { id: string; amountMinor?: number }) =>
  captureOrder.func({ stripeApi: stripeApi(posts), kysely } as any, data, {} as any)

test('captures the full authorised amount and releases the order', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId, cartId } = await seedCartOrder(kysely, variantId, {
    captureMethod: 'manual',
    quantity: 2,
  })
  await authorize(kysely, orderId)

  const posts: Post[] = []
  const result = await capture(kysely, posts, { id: orderId })

  assert.deepEqual(result, { id: orderId, status: 'paid', amountCapturedMinor: 5000 })
  assert.equal(posts.length, 1)
  assert.equal(posts[0]!.path, '/payment_intents/pi_123/capture')
  assert.deepEqual(posts[0]!.body, { amount_to_capture: 5000 })
  assert.equal(posts[0]!.idempotencyKey, `capture_${orderId}`)

  const order = await kysely
    .selectFrom('paymentOrder')
    .select(['status', 'amountCapturedMinor'])
    .where('id', '=', orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.status, 'paid')
  assert.equal(order.amountCapturedMinor, 5000)

  const variant = await kysely
    .selectFrom('paymentVariant')
    .select(['stock'])
    .where('id', '=', variantId)
    .executeTakeFirstOrThrow()
  assert.equal(variant.stock, 8)

  const cart = await kysely
    .selectFrom('paymentCart')
    .select(['status'])
    .where('id', '=', cartId)
    .executeTakeFirstOrThrow()
  assert.equal(cart.status, 'converted')
})

test('a part-shipment captures less and records what was actually taken', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId, { captureMethod: 'manual' })
  await authorize(kysely, orderId)

  const posts: Post[] = []
  const result = await capture(kysely, posts, { id: orderId, amountMinor: 2000 })

  assert.equal(result?.amountCapturedMinor, 2000)
  assert.deepEqual(posts[0]!.body, { amount_to_capture: 2000 })

  const order = await kysely
    .selectFrom('paymentOrder')
    .select(['status', 'amountMinor', 'amountCapturedMinor'])
    .where('id', '=', orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.status, 'paid')
  assert.equal(order.amountMinor, 5000)
  assert.equal(order.amountCapturedMinor, 2000)
})

test('refuses to capture more than was authorised', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId, { captureMethod: 'manual' })
  await authorize(kysely, orderId)

  const posts: Post[] = []
  await assert.rejects(
    () => capture(kysely, posts, { id: orderId, amountMinor: 5001 }),
    /only 5000 was authorised/
  )
  assert.equal(posts.length, 0)
})

test('refuses an order that was captured automatically at checkout', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId, { captureMethod: 'automatic' })
  await authorize(kysely, orderId)

  const posts: Post[] = []
  await assert.rejects(() => capture(kysely, posts, { id: orderId }), /captured automatically/)
  assert.equal(posts.length, 0)
})

test('refuses an order the customer never completed', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId, { captureMethod: 'manual' })

  const posts: Post[] = []
  await assert.rejects(() => capture(kysely, posts, { id: orderId }), /is pending, not authorized/)
  assert.equal(posts.length, 0)
})

test('refuses an authorised order with no payment intent to charge', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId, { captureMethod: 'manual' })
  await kysely
    .updateTable('paymentOrder')
    .set({ status: 'authorized' })
    .where('id', '=', orderId)
    .execute()

  const posts: Post[] = []
  await assert.rejects(() => capture(kysely, posts, { id: orderId }), /no payment intent/)
  assert.equal(posts.length, 0)
})

test('an unknown order is a not-found, not a silent no-op', async () => {
  const kysely = createTestDb()
  const posts: Post[] = []
  await assert.rejects(() => capture(kysely, posts, { id: 'order_missing' }), /Unknown order/)
  assert.equal(posts.length, 0)
})

test('capturing twice does not decrement stock twice', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId, {
    captureMethod: 'manual',
    quantity: 3,
  })
  await authorize(kysely, orderId)

  const posts: Post[] = []
  await capture(kysely, posts, { id: orderId })
  await assert.rejects(() => capture(kysely, posts, { id: orderId }), /is paid, not authorized/)

  const variant = await kysely
    .selectFrom('paymentVariant')
    .select(['stock'])
    .where('id', '=', variantId)
    .executeTakeFirstOrThrow()
  assert.equal(variant.stock, 7)
})
