import assert from 'node:assert/strict'
import { test } from 'node:test'
import { StripeSignature, handleStripeWebhook } from '@pikku/addon-stripe-commerce'
import { createLogger, createTestDb, seedCartOrder, seedProduct } from './harness.js'

const SECRET = 'whsec_test'

const signed = async (body: string, secret = SECRET) => {
  const timestamp = Math.floor(Date.now() / 1000)
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${timestamp}.${body}`))
  const hex = Array.from(new Uint8Array(mac))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
  return `t=${timestamp},v1=${hex}`
}

/** The slice of pikku's http interaction the receiver actually touches. */
const httpFor = (body: string, signature: string | null) => ({
  http: {
    request: {
      header: (name: string) => (name === 'stripe-signature' ? signature : null),
      headers: () => (signature ? { 'stripe-signature': signature } : {}),
      arrayBuffer: async () => new TextEncoder().encode(body).buffer,
    },
  },
})

const deliver = async (
  kysely: ReturnType<typeof createTestDb>,
  event: Record<string, unknown>,
  options: { secret?: string | null; signWith?: string; signature?: string | null } = {}
) => {
  const body = JSON.stringify(event)
  const signature =
    options.signature !== undefined ? options.signature : await signed(body, options.signWith)
  const logger = createLogger()
  const services = {
    kysely,
    logger,
    stripeSignature: new StripeSignature(
      options.secret === undefined ? SECRET : options.secret
    ),
  } as any
  const result = await handleStripeWebhook.func(services, {}, httpFor(body, signature) as any)
  return { result, logger }
}

const event = (type: string, object: Record<string, unknown>, id = `evt_${crypto.randomUUID()}`) => ({
  id,
  type,
  data: { object },
})

test('a verified completed session settles its order', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { sessionId, orderId } = await seedCartOrder(kysely, variantId)

  const { result } = await deliver(
    kysely,
    event('checkout.session.completed', {
      id: sessionId,
      payment_status: 'paid',
      payment_intent: 'pi_1',
      amount_total: 5000,
    })
  )

  assert.equal(result?.received, true)
  assert.equal(result?.processed, true)
  const order = await kysely
    .selectFrom('paymentOrder')
    .select(['status', 'amountMinor'])
    .where('id', '=', orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.status, 'paid')
  assert.equal(order.amountMinor, 5000)
})

test('a redelivered event is acknowledged but not reapplied', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { sessionId, orderId } = await seedCartOrder(kysely, variantId, { quantity: 2 })
  const payload = event('checkout.session.completed', {
    id: sessionId,
    payment_status: 'paid',
    payment_intent: 'pi_1',
  })

  const first = await deliver(kysely, payload)
  const second = await deliver(kysely, payload)

  assert.equal(first.result?.processed, true)
  assert.equal(second.result?.processed, false)

  const variant = await kysely
    .selectFrom('paymentVariant')
    .select(['stock'])
    .where('id', '=', variantId)
    .executeTakeFirstOrThrow()
  assert.equal(variant.stock, 8)

  const recorded = await kysely
    .selectFrom('paymentWebhookEvent')
    .select(['status'])
    .where('id', '=', payload.id)
    .executeTakeFirstOrThrow()
  assert.equal(recorded.status, 'processed')
  assert.ok(orderId)
})

test('an unsigned request is refused', async () => {
  const kysely = createTestDb()
  await assert.rejects(
    () => deliver(kysely, event('checkout.session.completed', {}), { signature: null }),
    /Missing stripe-signature/
  )
})

test('a request signed with the wrong secret is refused and logged', async () => {
  const kysely = createTestDb()
  await assert.rejects(
    () => deliver(kysely, event('checkout.session.completed', {}), { signWith: 'whsec_other' }),
    /Invalid Stripe webhook signature/
  )
})

test('an unconfigured receiver refuses every caller rather than trusting them', async () => {
  const kysely = createTestDb()
  await assert.rejects(
    () => deliver(kysely, event('checkout.session.completed', {}), { secret: null }),
    /not configured/
  )
})

test('async_payment_succeeded settles a delayed payment', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { sessionId, orderId } = await seedCartOrder(kysely, variantId)

  await deliver(
    kysely,
    event('checkout.session.completed', { id: sessionId, payment_status: 'unpaid' })
  )
  let order = await kysely
    .selectFrom('paymentOrder')
    .select(['status'])
    .where('id', '=', orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.status, 'processing')

  await deliver(
    kysely,
    event('checkout.session.async_payment_succeeded', { id: sessionId, payment_status: 'paid' })
  )
  order = await kysely
    .selectFrom('paymentOrder')
    .select(['status'])
    .where('id', '=', orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.status, 'paid')
})

test('async_payment_failed marks the order failed', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { sessionId, orderId } = await seedCartOrder(kysely, variantId)

  await deliver(kysely, event('checkout.session.async_payment_failed', { id: sessionId }))

  const order = await kysely
    .selectFrom('paymentOrder')
    .select(['status'])
    .where('id', '=', orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.status, 'failed')
})

test('an expired session closes a pending order but never a paid one', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const pending = await seedCartOrder(kysely, variantId)
  const settled = await seedCartOrder(kysely, variantId)
  await kysely
    .updateTable('paymentOrder')
    .set({ status: 'paid' })
    .where('id', '=', settled.orderId)
    .execute()

  await deliver(kysely, event('checkout.session.expired', { id: pending.sessionId }))
  await deliver(kysely, event('checkout.session.expired', { id: settled.sessionId }))

  const rows = await kysely.selectFrom('paymentOrder').select(['id', 'status']).execute()
  assert.equal(rows.find((r) => r.id === pending.orderId)!.status, 'expired')
  assert.equal(rows.find((r) => r.id === settled.orderId)!.status, 'paid')
})

test('a failed payment intent fails its order', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId)
  await kysely
    .updateTable('paymentOrder')
    .set({ stripePaymentIntentId: 'pi_1' })
    .where('id', '=', orderId)
    .execute()

  await deliver(kysely, event('payment_intent.payment_failed', { id: 'pi_1' }))

  const order = await kysely
    .selectFrom('paymentOrder')
    .select(['status'])
    .where('id', '=', orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.status, 'failed')
})

test('a refund made in the Stripe dashboard is mirrored back, in full or in part', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId)
  await kysely
    .updateTable('paymentOrder')
    .set({ status: 'paid', stripePaymentIntentId: 'pi_1', amountMinor: 5000 })
    .where('id', '=', orderId)
    .execute()

  await deliver(
    kysely,
    event('charge.refunded', {
      payment_intent: 'pi_1',
      amount_refunded: 2000,
      amount_captured: 5000,
    })
  )
  let order = await kysely
    .selectFrom('paymentOrder')
    .select(['status', 'amountRefundedMinor'])
    .where('id', '=', orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.status, 'paid')
  assert.equal(order.amountRefundedMinor, 2000)

  await deliver(
    kysely,
    event('charge.refunded', {
      payment_intent: 'pi_1',
      amount_refunded: 5000,
      amount_captured: 5000,
    })
  )
  order = await kysely
    .selectFrom('paymentOrder')
    .select(['status', 'amountRefundedMinor'])
    .where('id', '=', orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.status, 'refunded')
  assert.equal(order.amountRefundedMinor, 5000)
})

test('a charge with no captured amount falls back to the charge amount', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId)
  await kysely
    .updateTable('paymentOrder')
    .set({ status: 'paid', stripePaymentIntentId: 'pi_1' })
    .where('id', '=', orderId)
    .execute()

  await deliver(
    kysely,
    event('charge.refunded', { payment_intent: 'pi_1', amount_refunded: 2500, amount: 2500 })
  )

  const order = await kysely
    .selectFrom('paymentOrder')
    .select(['status'])
    .where('id', '=', orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.status, 'refunded')
})

test('a dispute is recorded without rewriting payment state, and its outcome updates it', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId)
  await kysely
    .updateTable('paymentOrder')
    .set({ status: 'paid', stripePaymentIntentId: 'pi_1' })
    .where('id', '=', orderId)
    .execute()

  await deliver(
    kysely,
    event('charge.dispute.created', { payment_intent: 'pi_1', status: 'needs_response' })
  )
  let order = await kysely
    .selectFrom('paymentOrder')
    .select(['status', 'disputeStatus'])
    .where('id', '=', orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.disputeStatus, 'open')
  assert.equal(order.status, 'paid')

  await deliver(kysely, event('charge.dispute.closed', { payment_intent: 'pi_1', status: 'lost' }))
  order = await kysely
    .selectFrom('paymentOrder')
    .select(['status', 'disputeStatus'])
    .where('id', '=', orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.disputeStatus, 'lost')
  assert.equal(order.status, 'paid')
})

test('a won dispute is recorded as won', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId)
  await kysely
    .updateTable('paymentOrder')
    .set({ stripePaymentIntentId: 'pi_1' })
    .where('id', '=', orderId)
    .execute()

  await deliver(kysely, event('charge.dispute.closed', { payment_intent: 'pi_1', status: 'won' }))

  const order = await kysely
    .selectFrom('paymentOrder')
    .select(['disputeStatus'])
    .where('id', '=', orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.disputeStatus, 'won')
})

test('a subscription is upserted, so created then updated leaves one row', async () => {
  const kysely = createTestDb()

  await deliver(
    kysely,
    event('customer.subscription.created', {
      id: 'sub_1',
      status: 'active',
      current_period_end: 1790000000,
      cancel_at_period_end: false,
      items: { data: [{ price: { id: 'price_1' } }] },
    })
  )
  await deliver(
    kysely,
    event('customer.subscription.updated', {
      id: 'sub_1',
      status: 'past_due',
      cancel_at_period_end: true,
    })
  )

  const rows = await kysely.selectFrom('paymentSubscription').selectAll().execute()
  assert.equal(rows.length, 1)
  assert.equal(rows[0]!.status, 'past_due')
  assert.equal(rows[0]!.cancelAtPeriodEnd, 1)
  assert.equal(rows[0]!.stripePriceId, 'price_1')
  assert.equal(rows[0]!.currentPeriodEnd, null)
})

test('a deleted subscription keeps the row and records the status', async () => {
  const kysely = createTestDb()

  await deliver(
    kysely,
    event('customer.subscription.deleted', { id: 'sub_1', status: 'canceled' })
  )

  const rows = await kysely.selectFrom('paymentSubscription').selectAll().execute()
  assert.equal(rows.length, 1)
  assert.equal(rows[0]!.status, 'canceled')
})

test('a subscription event with no id is ignored rather than inserting a blank row', async () => {
  const kysely = createTestDb()
  const { result } = await deliver(kysely, event('customer.subscription.created', { status: 'active' }))
  assert.equal(result?.processed, true)
  const rows = await kysely.selectFrom('paymentSubscription').selectAll().execute()
  assert.equal(rows.length, 0)
})

test('an unhandled event type is acknowledged and recorded, not dropped', async () => {
  const kysely = createTestDb()
  const { result, logger } = await deliver(kysely, event('invoice.paid', { id: 'in_1' }))

  assert.equal(result?.processed, true)
  assert.equal(result?.type, 'invoice.paid')
  assert.match(logger.debugged[0]!, /no handler for invoice.paid/)
  const recorded = await kysely
    .selectFrom('paymentWebhookEvent')
    .select(['status'])
    .where('id', '=', result!.eventId)
    .executeTakeFirstOrThrow()
  assert.equal(recorded.status, 'processed')
})

test('a session for an order we do not have is warned, not thrown', async () => {
  const kysely = createTestDb()
  const { result, logger } = await deliver(
    kysely,
    event('checkout.session.completed', { id: 'cs_unknown', payment_status: 'paid' })
  )

  assert.equal(result?.processed, true)
  assert.match(logger.warned[0]!, /no order for checkout session cs_unknown/)
})

test('a subscription whose period moved onto its items is still dated', async () => {
  const kysely = createTestDb()

  await deliver(
    kysely,
    event('customer.subscription.created', {
      id: 'sub_items',
      status: 'active',
      cancel_at_period_end: false,
      items: { data: [{ price: { id: 'price_1' }, current_period_end: 1790000000 }] },
    })
  )

  const row = await kysely
    .selectFrom('paymentSubscription')
    .selectAll()
    .executeTakeFirstOrThrow()
  assert.equal(row.currentPeriodEnd, new Date(1790000000 * 1000).toISOString())
})

test('a subscription is hung off the local customer it belongs to', async () => {
  const kysely = createTestDb()
  const customerId = crypto.randomUUID()
  await kysely
    .insertInto('paymentCustomer')
    .values({
      id: customerId,
      ownerType: 'user',
      ownerId: 'user_1',
      stripeCustomerId: 'cus_1',
      email: null,
      createdAt: new Date().toISOString(),
    })
    .execute()

  await deliver(
    kysely,
    event('customer.subscription.created', {
      id: 'sub_owned',
      status: 'active',
      customer: 'cus_1',
      cancel_at_period_end: false,
      items: { data: [{ price: { id: 'price_1' } }] },
    })
  )

  const row = await kysely
    .selectFrom('paymentSubscription')
    .selectAll()
    .executeTakeFirstOrThrow()
  assert.equal(row.customerId, customerId)
})

test('a subscription for a customer this addon never saw is recorded unowned', async () => {
  const kysely = createTestDb()

  await deliver(
    kysely,
    event('customer.subscription.created', {
      id: 'sub_foreign',
      status: 'active',
      customer: 'cus_elsewhere',
      cancel_at_period_end: false,
      items: { data: [{ price: { id: 'price_1' } }] },
    })
  )

  const row = await kysely
    .selectFrom('paymentSubscription')
    .selectAll()
    .executeTakeFirstOrThrow()
  assert.equal(row.customerId, null)
})

test('a subscription selling one of our variants is marked as a storefront sale', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely, { recurringInterval: 'month' })
  await kysely
    .updateTable('paymentVariant')
    .set({ stripePriceId: 'price_ours' })
    .where('id', '=', variantId)
    .execute()

  await deliver(
    kysely,
    event('customer.subscription.created', {
      id: 'sub_shop',
      status: 'active',
      cancel_at_period_end: false,
      items: { data: [{ price: { id: 'price_ours' } }] },
    })
  )

  const row = await kysely
    .selectFrom('paymentSubscription')
    .selectAll()
    .executeTakeFirstOrThrow()
  assert.equal(row.variantId, variantId)
})

test("a plan subscription created elsewhere is recorded, and not ours", async () => {
  const kysely = createTestDb()
  await seedProduct(kysely, { recurringInterval: 'month' })

  await deliver(
    kysely,
    event('customer.subscription.created', {
      id: 'sub_plan',
      status: 'active',
      cancel_at_period_end: false,
      items: { data: [{ price: { id: 'price_better_auth' } }] },
    })
  )

  const row = await kysely
    .selectFrom('paymentSubscription')
    .selectAll()
    .executeTakeFirstOrThrow()
  assert.equal(row.stripePriceId, 'price_better_auth')
  assert.equal(row.variantId, null)
})
