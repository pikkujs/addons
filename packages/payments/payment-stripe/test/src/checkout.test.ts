import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createCartCheckout, createCheckout, setCartItem } from '@pikku/addon-payment-stripe'
import { createServices, createTestDb, seedProduct } from './harness.js'

const session = (over: Record<string, unknown> = {}) => ({
  '/checkout/sessions': {
    id: 'cs_1',
    url: 'https://checkout.stripe.com/cs_1',
    customer: null,
    amount_total: 5000,
    currency: 'eur',
    ...over,
  },
  '/customers': { id: 'cus_1' },
  '/products': { id: 'prod_1' },
  '/prices': { id: 'price_1' },
  '/shipping_rates': { id: 'shr_1' },
})

const oneOff = {
  mode: 'payment' as const,
  priceId: 'price_abc',
  successUrl: 'https://shop/ok',
  cancelUrl: 'https://shop/no',
}

test('a one-off checkout posts the line item and records a pending order', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, { replies: session() })

  const result = await createCheckout.func(services, oneOff, {} as any)

  assert.equal(result?.sessionId, 'cs_1')
  assert.equal(result?.url, 'https://checkout.stripe.com/cs_1')
  const call = posts.find((p) => p.path === '/checkout/sessions')!
  assert.equal(call.body.mode, 'payment')
  assert.deepEqual(call.body.line_items, [{ price: 'price_abc', quantity: 1 }])
  assert.equal(call.body.client_reference_id, result!.orderId)
  assert.equal(call.idempotencyKey, result!.orderId)
  assert.equal(call.body.payment_intent_data.capture_method, 'automatic')

  const order = await kysely
    .selectFrom('paymentOrder')
    .selectAll()
    .where('id', '=', result!.orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.status, 'pending')
  assert.equal(order.amountMinor, 5000)
  assert.equal(order.currency, 'eur')
  assert.equal(order.fulfillmentStatus, 'not_required')
  assert.equal(order.stripeCheckoutSessionId, 'cs_1')
})

test('an inline price is sent as price_data rather than a pre-created Price', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, { replies: session() })

  await createCheckout.func(
    services,
    {
      mode: 'payment',
      priceData: { amountMinor: 1200, currency: 'usd', productName: 'Consulting hour' },
      quantity: 3,
      successUrl: 'https://shop/ok',
      cancelUrl: 'https://shop/no',
    },
    {} as any
  )

  const call = posts.find((p) => p.path === '/checkout/sessions')!
  assert.deepEqual(call.body.line_items, [
    {
      quantity: 3,
      price_data: {
        currency: 'usd',
        unit_amount: 1200,
        product_data: { name: 'Consulting hour' },
      },
    },
  ])
})

test('a subscription sends subscription_data and no capture method', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, { replies: session() })

  await createCheckout.func(
    services,
    {
      mode: 'subscription',
      priceData: { amountMinor: 900, currency: 'eur', productName: 'Plan', interval: 'month' },
      successUrl: 'https://shop/ok',
      cancelUrl: 'https://shop/no',
    },
    {} as any
  )

  const call = posts.find((p) => p.path === '/checkout/sessions')!
  assert.equal(call.body.payment_intent_data, undefined)
  assert.ok(call.body.subscription_data)
  assert.deepEqual((call.body.line_items as any)[0].price_data.recurring, { interval: 'month' })
})

test('manual capture is passed through on the payment intent', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, { replies: session() })

  const result = await createCheckout.func(
    services,
    { ...oneOff, captureMethod: 'manual' },
    {} as any
  )

  const call = posts.find((p) => p.path === '/checkout/sessions')!
  assert.equal(call.body.payment_intent_data.capture_method, 'manual')
  const order = await kysely
    .selectFrom('paymentOrder')
    .select(['captureMethod'])
    .where('id', '=', result!.orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.captureMethod, 'manual')
})

test('an identified buyer is attached as a Stripe customer, an anonymous one is not', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, { replies: session() })

  await createCheckout.func(services, { ...oneOff, email: 'ada@example.com' }, {} as any)
  const identified = posts.find((p) => p.path === '/checkout/sessions')!
  assert.equal(identified.body.customer, 'cus_1')
  assert.equal(identified.body.customer_email, undefined)

  const other = createServices(createTestDb(), { replies: session() })
  await createCheckout.func(other.services, oneOff, {} as any)
  const anonymous = other.posts.find((p) => p.path === '/checkout/sessions')!
  assert.equal(anonymous.body.customer, undefined)
  assert.equal(anonymous.body.customer_email, undefined)
})

test('metadata carries the order id so the webhook can find its way back', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, { replies: session() })

  const result = await createCheckout.func(
    services,
    { ...oneOff, metadata: { campaign: 'spring' } },
    {} as any
  )

  const call = posts.find((p) => p.path === '/checkout/sessions')!
  assert.deepEqual(call.body.metadata, { campaign: 'spring', paymentOrderId: result!.orderId })
})

test('refuses a checkout with neither a price nor price data', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, { replies: session() })
  await assert.rejects(
    () =>
      createCheckout.func(
        services,
        { mode: 'payment', successUrl: 'https://s', cancelUrl: 'https://c' },
        {} as any
      ),
    /Provide either priceId or priceData/
  )
})

test('refuses an inline subscription price with no interval', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, { replies: session() })
  await assert.rejects(
    () =>
      createCheckout.func(
        services,
        {
          mode: 'subscription',
          priceData: { amountMinor: 900, currency: 'eur', productName: 'Plan' },
          successUrl: 'https://s',
          cancelUrl: 'https://c',
        },
        {} as any
      ),
    /interval is required/
  )
})

test('refuses to authorise a subscription for later capture', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, { replies: session() })
  await assert.rejects(
    () =>
      createCheckout.func(
        services,
        { ...oneOff, mode: 'subscription', captureMethod: 'manual' },
        {} as any
      ),
    /cannot be authorised and captured later/
  )
})

test('a session with no URL is an error, not a half-written order', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, { replies: session({ url: null }) })

  await assert.rejects(() => createCheckout.func(services, oneOff, {} as any), /no URL/)
  const orders = await kysely.selectFrom('paymentOrder').selectAll().execute()
  assert.equal(orders.length, 0)
})

const cartWith = async (
  kysely: ReturnType<typeof createTestDb>,
  services: any,
  options: Parameters<typeof seedProduct>[1] = {},
  quantity = 2
) => {
  const { variantId } = await seedProduct(kysely, options)
  const cart = await setCartItem.func(services, { variantId, quantity }, {} as any)
  return { variantId, token: cart!.token }
}

const cartCheckout = {
  successUrl: 'https://shop/ok',
  cancelUrl: 'https://shop/no',
}

test('a cart checkout snapshots the line items onto the order', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, { replies: session() })
  const { token, variantId } = await cartWith(kysely, services)
  posts.length = 0

  const result = await createCartCheckout.func(services, { ...cartCheckout, token }, {} as any)

  const call = posts.find((p) => p.path === '/checkout/sessions')!
  assert.deepEqual(call.body.line_items, [{ price: 'price_test', quantity: 2 }])
  assert.equal(call.body.allow_promotion_codes, true)

  const items = await kysely
    .selectFrom('paymentOrderItem')
    .selectAll()
    .where('orderId', '=', result!.orderId)
    .execute()
  assert.equal(items.length, 1)
  assert.equal(items[0]!.variantId, variantId)
  assert.equal(items[0]!.name, 'Kettle — Standard')
  assert.equal(items[0]!.quantity, 2)
  assert.equal(items[0]!.unitAmountMinor, 2500)
  assert.equal(items[0]!.requiresShipping, 1)
})

test('stock is not decremented at checkout — only when the money arrives', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, { replies: session() })
  const { token, variantId } = await cartWith(kysely, services)

  await createCartCheckout.func(services, { ...cartCheckout, token }, {} as any)

  const variant = await kysely
    .selectFrom('paymentVariant')
    .select(['stock'])
    .where('id', '=', variantId)
    .executeTakeFirstOrThrow()
  assert.equal(variant.stock, 10)
})

test('a physical cart collects an address and offers the active shipping rates', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, { replies: session() })
  const now = new Date().toISOString()
  await kysely
    .insertInto('paymentShippingRate')
    .values({
      id: 'rate_1',
      name: 'Standard',
      amountMinor: 499,
      currency: 'eur',
      deliveryMinDays: null,
      deliveryMaxDays: null,
      stripeShippingRateId: 'shr_existing',
      position: 0,
      active: 1,
      createdAt: now,
      updatedAt: now,
    })
    .execute()
  const { token } = await cartWith(kysely, services)
  posts.length = 0

  const result = await createCartCheckout.func(services, { ...cartCheckout, token }, {} as any)

  const call = posts.find((p) => p.path === '/checkout/sessions')!
  assert.deepEqual(call.body.shipping_options, [{ shipping_rate: 'shr_existing' }])
  assert.ok((call.body.shipping_address_collection.allowed_countries as string[]).includes('DE'))

  const order = await kysely
    .selectFrom('paymentOrder')
    .select(['fulfillmentStatus'])
    .where('id', '=', result!.orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.fulfillmentStatus, 'unfulfilled')
})

test('an unmirrored shipping rate is pushed to Stripe at checkout and remembered', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, { replies: session() })
  const now = new Date().toISOString()
  await kysely
    .insertInto('paymentShippingRate')
    .values({
      id: 'rate_1',
      name: 'Standard',
      amountMinor: 499,
      currency: 'eur',
      deliveryMinDays: null,
      deliveryMaxDays: null,
      stripeShippingRateId: null,
      position: 0,
      active: 1,
      createdAt: now,
      updatedAt: now,
    })
    .execute()
  const { token } = await cartWith(kysely, services)
  posts.length = 0

  await createCartCheckout.func(services, { ...cartCheckout, token }, {} as any)

  assert.ok(posts.some((p) => p.path === '/shipping_rates'))
  const rate = await kysely
    .selectFrom('paymentShippingRate')
    .select(['stripeShippingRateId'])
    .where('id', '=', 'rate_1')
    .executeTakeFirstOrThrow()
  assert.equal(rate.stripeShippingRateId, 'shr_1')
})

test('a caller can narrow the countries the shop ships to', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, { replies: session() })
  const { token } = await cartWith(kysely, services)
  posts.length = 0

  await createCartCheckout.func(
    services,
    { ...cartCheckout, token, shippingCountries: ['DE', 'AT'] },
    {} as any
  )

  const call = posts.find((p) => p.path === '/checkout/sessions')!
  assert.deepEqual(call.body.shipping_address_collection, { allowed_countries: ['DE', 'AT'] })
})

test('a digital cart collects no address and needs no fulfilment', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, { replies: session() })
  const { token } = await cartWith(kysely, services, { requiresShipping: false })
  posts.length = 0

  const result = await createCartCheckout.func(services, { ...cartCheckout, token }, {} as any)

  const call = posts.find((p) => p.path === '/checkout/sessions')!
  assert.equal(call.body.shipping_address_collection, undefined)
  const order = await kysely
    .selectFrom('paymentOrder')
    .select(['fulfillmentStatus'])
    .where('id', '=', result!.orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.fulfillmentStatus, 'not_required')
})

test('a recurring cart checks out in subscription mode', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, { replies: session() })
  const { token } = await cartWith(kysely, services, { recurringInterval: 'month' })
  posts.length = 0

  await createCartCheckout.func(services, { ...cartCheckout, token }, {} as any)

  const call = posts.find((p) => p.path === '/checkout/sessions')!
  assert.equal(call.body.mode, 'subscription')
  assert.ok(call.body.subscription_data)
})

test('automatic tax and promotion codes are opt-in and opt-out', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, { replies: session() })
  const { token } = await cartWith(kysely, services)
  posts.length = 0

  await createCartCheckout.func(
    services,
    { ...cartCheckout, token, automaticTax: true, allowPromotionCodes: false },
    {} as any
  )

  const call = posts.find((p) => p.path === '/checkout/sessions')!
  assert.deepEqual(call.body.automatic_tax, { enabled: true })
  assert.equal(call.body.allow_promotion_codes, false)
})

test('checking out an unknown or already-converted cart is refused', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, { replies: session() })
  const { token } = await cartWith(kysely, services)

  await assert.rejects(
    () => createCartCheckout.func(services, { ...cartCheckout, token: 'nope' }, {} as any),
    /No open cart/
  )

  await kysely.updateTable('paymentCart').set({ status: 'converted' }).execute()
  await assert.rejects(
    () => createCartCheckout.func(services, { ...cartCheckout, token }, {} as any),
    /No open cart/
  )
})

test('refuses an empty cart', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, { replies: session() })
  const { variantId } = await seedProduct(kysely)
  const opened = await setCartItem.func(services, { variantId, quantity: 1 }, {} as any)
  await setCartItem.func(
    services,
    { token: opened!.token, variantId, quantity: 0 },
    {} as any
  )

  await assert.rejects(
    () => createCartCheckout.func(services, { ...cartCheckout, token: opened!.token }, {} as any),
    /Cart is empty/
  )
})

test('refuses a cart whose stock ran out after the item was added', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, { replies: session() })
  const { token, variantId } = await cartWith(kysely, services)
  await kysely.updateTable('paymentVariant').set({ stock: 1 }).where('id', '=', variantId).execute()

  await assert.rejects(
    () => createCartCheckout.func(services, { ...cartCheckout, token }, {} as any),
    /only has 1 left/
  )
})

test('refuses a cart mixing a subscription with a one-off item', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, { replies: session() })
  const { token } = await cartWith(kysely, services, { recurringInterval: 'month' })
  const { variantId: oneOffVariant } = await seedProduct(kysely)
  await setCartItem.func(services, { token, variantId: oneOffVariant, quantity: 1 }, {} as any)

  await assert.rejects(
    () => createCartCheckout.func(services, { ...cartCheckout, token }, {} as any),
    /cannot mix subscription and one-off/
  )
})

test('refuses to authorise a subscription cart for later capture', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, { replies: session() })
  const { token } = await cartWith(kysely, services, { recurringInterval: 'month' })

  await assert.rejects(
    () =>
      createCartCheckout.func(
        services,
        { ...cartCheckout, token, captureMethod: 'manual' },
        {} as any
      ),
    /cannot be authorised and captured later/
  )
})

test('a cart session with no URL is an error, not a half-written order', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, { replies: session({ url: null }) })
  const { token } = await cartWith(kysely, services)

  await assert.rejects(
    () => createCartCheckout.func(services, { ...cartCheckout, token }, {} as any),
    /no URL/
  )
  const orders = await kysely.selectFrom('paymentOrder').selectAll().execute()
  assert.equal(orders.length, 0)
})

test('falls back to the cart subtotal when Stripe returns no total', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, {
    replies: session({ amount_total: null, currency: null }),
  })
  const { token } = await cartWith(kysely, services)

  const result = await createCartCheckout.func(services, { ...cartCheckout, token }, {} as any)

  const order = await kysely
    .selectFrom('paymentOrder')
    .select(['amountMinor', 'currency'])
    .where('id', '=', result!.orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.amountMinor, 5000)
  assert.equal(order.currency, 'eur')
})

test('an app that already holds a Stripe customer has it reused, not duplicated', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, {
    replies: { '/checkout/sessions': { id: 'cs_1', url: 'https://pay' } },
    paymentOwner: {
      resolve: async () => ({
        type: 'organization',
        id: 'org_1',
        stripeCustomerId: 'cus_from_better_auth',
      }),
    },
  })

  await createCheckout.func(services, oneOff, {} as any)

  assert.equal(posts.some((post) => post.path === '/customers'), false)
  const session = posts.find((post) => post.path === '/checkout/sessions')!
  assert.equal(session.body.customer, 'cus_from_better_auth')

  const customer = await kysely.selectFrom('paymentCustomer').selectAll().executeTakeFirstOrThrow()
  assert.equal(customer.ownerType, 'organization')
  assert.equal(customer.ownerId, 'org_1')
})
