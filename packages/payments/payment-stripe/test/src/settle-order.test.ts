import assert from 'node:assert/strict'
import test from 'node:test'
import { settleCheckoutSession } from '@pikku/addon-payment-stripe'
import { createLogger, createTestDb, seedCartOrder, seedProduct } from './harness.js'

const NOW = '2026-08-31T13:00:00.000Z'

/** A card session: Stripe reports the money as already taken. */
const cardSession = (sessionId: string) => ({
  id: sessionId,
  payment_status: 'paid',
  payment_intent: 'pi_card',
  amount_total: 5000,
  customer_details: { email: 'buyer@example.com' },
  collected_information: {
    shipping_details: {
      name: 'A Buyer',
      address: {
        line1: '1 Test Street',
        line2: null,
        city: 'Berlin',
        state: null,
        postal_code: '10115',
        country: 'DE',
      },
    },
  },
})

/**
 * A SEPA session. `checkout.session.completed` fires the moment the customer
 * authorises the mandate, but SEPA takes about six business days to settle, so
 * Stripe reports payment_status 'unpaid' until then.
 */
const sepaPendingSession = (sessionId: string) => ({
  ...cardSession(sessionId),
  payment_status: 'unpaid',
  payment_intent: 'pi_sepa',
})

const orderRow = async (kysely: any, orderId: string) =>
  await kysely.selectFrom('paymentOrder').selectAll().where('id', '=', orderId).executeTakeFirstOrThrow()

const stockOf = async (kysely: any, variantId: string) =>
  (await kysely.selectFrom('paymentVariant').select(['stock']).where('id', '=', variantId).executeTakeFirstOrThrow()).stock

test('a card payment is paid, decrements stock and converts the cart', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely, { stock: 10 })
  const { orderId, sessionId, cartId } = await seedCartOrder(kysely, variantId, { quantity: 2 })

  await settleCheckoutSession(kysely, createLogger(), cardSession(sessionId), NOW)

  const order = await orderRow(kysely, orderId)
  assert.equal(order.status, 'paid')
  assert.equal(order.stripePaymentIntentId, 'pi_card')
  assert.equal(order.amountMinor, 5000)
  assert.equal(order.email, 'buyer@example.com')
  assert.equal(await stockOf(kysely, variantId), 8)

  const cart = await kysely.selectFrom('paymentCart').select(['status']).where('id', '=', cartId).executeTakeFirstOrThrow()
  assert.equal(cart.status, 'converted')
})

test('a SEPA mandate is processing, not paid — no stock moves and the cart stays open', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely, { stock: 10 })
  const { orderId, sessionId, cartId } = await seedCartOrder(kysely, variantId, { quantity: 2 })

  await settleCheckoutSession(kysely, createLogger(), sepaPendingSession(sessionId), NOW)

  const order = await orderRow(kysely, orderId)
  assert.equal(order.status, 'processing')
  assert.equal(await stockOf(kysely, variantId), 10)

  const cart = await kysely.selectFrom('paymentCart').select(['status']).where('id', '=', cartId).executeTakeFirstOrThrow()
  assert.equal(cart.status, 'open')
})

test('a SEPA order still records the address and payment intent while it settles', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId, sessionId } = await seedCartOrder(kysely, variantId)

  await settleCheckoutSession(kysely, createLogger(), sepaPendingSession(sessionId), NOW)

  const order = await orderRow(kysely, orderId)
  assert.equal(order.stripePaymentIntentId, 'pi_sepa')
  assert.equal(order.shippingLine1, '1 Test Street')
  assert.equal(order.shippingCountry, 'DE')
})

test('async_payment_succeeded settles a SEPA order that was processing', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely, { stock: 10 })
  const { orderId, sessionId } = await seedCartOrder(kysely, variantId, { quantity: 2 })
  const logger = createLogger()

  await settleCheckoutSession(kysely, logger, sepaPendingSession(sessionId), NOW)
  await settleCheckoutSession(kysely, logger, { ...sepaPendingSession(sessionId), payment_status: 'paid' }, NOW)

  assert.equal((await orderRow(kysely, orderId)).status, 'paid')
  assert.equal(await stockOf(kysely, variantId), 8)
})

test('a redelivered event does not decrement stock twice', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely, { stock: 10 })
  const { sessionId } = await seedCartOrder(kysely, variantId, { quantity: 3 })
  const logger = createLogger()

  await settleCheckoutSession(kysely, logger, cardSession(sessionId), NOW)
  await settleCheckoutSession(kysely, logger, cardSession(sessionId), NOW)

  assert.equal(await stockOf(kysely, variantId), 7)
})

test('a manual-capture session is authorized, not processing', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely, { stock: 10 })
  const { orderId, sessionId } = await seedCartOrder(kysely, variantId, { captureMethod: 'manual' })

  await settleCheckoutSession(
    kysely,
    createLogger(),
    { ...cardSession(sessionId), payment_status: 'unpaid' },
    NOW
  )

  const order = await orderRow(kysely, orderId)
  assert.equal(order.status, 'authorized')
  assert.equal(await stockOf(kysely, variantId), 10)
})

test('an untracked variant is left alone rather than going negative', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely, { stock: null })
  const { sessionId } = await seedCartOrder(kysely, variantId, { quantity: 5 })

  await settleCheckoutSession(kysely, createLogger(), cardSession(sessionId), NOW)

  assert.equal(await stockOf(kysely, variantId), null)
})

test('reads the address from the legacy shipping_details shape', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId, sessionId } = await seedCartOrder(kysely, variantId)
  const { collected_information, ...legacy } = cardSession(sessionId)

  await settleCheckoutSession(
    kysely,
    createLogger(),
    { ...legacy, shipping_details: collected_information.shipping_details },
    NOW
  )

  assert.equal((await orderRow(kysely, orderId)).shippingCity, 'Berlin')
})

test('an event for an unknown session warns rather than throwing', async () => {
  const kysely = createTestDb()
  const logger = createLogger()

  await settleCheckoutSession(kysely, logger, cardSession('cs_nothing'), NOW)

  assert.equal(logger.warned.length, 1)
  assert.match(logger.warned[0]!, /no order for checkout session cs_nothing/)
})
