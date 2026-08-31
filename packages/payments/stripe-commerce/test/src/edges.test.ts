import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  StripeApi,
  StripeSignature,
  createCartCheckout,
  createCheckout,
  ensureCustomer,
  ensureVariantPrice,
  fulfillOrder,
  handleStripeWebhook,
  loadCart,
  saveProduct,
  setCartItem,
} from '@pikku/addon-stripe-commerce'
import { createLogger, createServices, createTestDb, seedCartOrder, seedProduct } from './harness.js'

test('a request whose raw body cannot be read is refused, not verified against nothing', async () => {
  const services = {
    kysely: createTestDb(),
    logger: createLogger(),
    stripeSignature: new StripeSignature('whsec_test'),
  } as any
  const http = {
    http: {
      request: {
        header: () => 't=1,v1=abc',
        headers: () => ({}),
      },
    },
  }

  await assert.rejects(
    () => handleStripeWebhook.func(services, {}, http as any),
    /Cannot read the raw request body/
  )
})

test('the signature header is read from headers() when header() gives nothing', async () => {
  const kysely = createTestDb()
  const body = JSON.stringify({ id: 'evt_1', type: 'invoice.paid', data: { object: {} } })
  const timestamp = Math.floor(Date.now() / 1000)
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode('whsec_test'),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${timestamp}.${body}`))
  const signature = `t=${timestamp},v1=${Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')}`

  const result = await handleStripeWebhook.func(
    { kysely, logger: createLogger(), stripeSignature: new StripeSignature('whsec_test') } as any,
    {},
    {
      http: {
        request: {
          header: () => null,
          headers: () => ({ 'stripe-signature': signature }),
          arrayBuffer: async () => new TextEncoder().encode(body).buffer,
        },
      },
    } as any
  )

  assert.equal(result?.eventId, 'evt_1')
})

test('loading an unknown cart is refused rather than returning an empty one', async () => {
  const kysely = createTestDb()
  await assert.rejects(() => loadCart(kysely, 'nope'), /Unknown cart nope/)
})

test('fulfilling without tracking details clears them rather than leaving a stale number', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  const { orderId } = await seedCartOrder(kysely, variantId)
  await kysely
    .updateTable('paymentOrder')
    .set({ status: 'paid', trackingNumber: 'OLD', trackingUrl: 'https://old' })
    .where('id', '=', orderId)
    .execute()
  const { services } = createServices(kysely)

  await fulfillOrder.func(services, { id: orderId }, {} as any)

  const order = await kysely
    .selectFrom('paymentOrder')
    .select(['trackingNumber', 'trackingUrl'])
    .where('id', '=', orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.trackingNumber, null)
  assert.equal(order.trackingUrl, null)
})

test('a variant deleted mid-checkout fails loudly instead of selling an unpriced line', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely)
  await kysely
    .updateTable('paymentVariant')
    .set({ stripePriceId: null })
    .where('id', '=', variantId)
    .execute()
  await kysely.updateTable('paymentProduct').set({ stripeProductId: null }).execute()

  const racingApi = {
    post: async (path: string) => {
      if (path === '/products') {
        await kysely.deleteFrom('paymentVariant').where('id', '=', variantId).execute()
      }
      return { id: 'prod_1' }
    },
  }

  await assert.rejects(
    () => ensureVariantPrice(racingApi as any, kysely, variantId),
    /Could not create a Stripe price/
  )
})

test('a signature of the wrong length is rejected without comparing it', async () => {
  const verifier = new StripeSignature('whsec_test')
  await assert.rejects(
    () => verifier.verify('{}', `t=${Math.floor(Date.now() / 1000)},v1=abc`),
    /does not match/
  )
})

test('junk segments in the signature header are skipped, not parsed', async () => {
  const verifier = new StripeSignature('whsec_test')
  await assert.rejects(
    () => verifier.verify('{}', `junk,t=${Math.floor(Date.now() / 1000)},v0=,v1=${'0'.repeat(64)}`),
    /does not match/
  )
  await assert.rejects(() => verifier.verify('{}', 'junk,v1=abc'), /Malformed/)
})

test('a non-numeric timestamp is malformed, not treated as epoch zero', async () => {
  const verifier = new StripeSignature('whsec_test')
  await assert.rejects(
    () => verifier.verify('{}', `t=notanumber,v1=${'0'.repeat(64)}`),
    /Malformed/
  )
})

test('a pinned API version is sent on GET as well as POST', async () => {
  const calls: Array<{ url: string; init: any }> = []
  const realFetch = globalThis.fetch
  globalThis.fetch = (async (url: any, init: any) => {
    calls.push({ url: String(url), init })
    return new Response(JSON.stringify({ id: 'cus_1' }), { status: 200 })
  }) as typeof fetch
  try {
    const api = new StripeApi('sk_test', 'https://api.stripe.com', '2025-01-01')
    await api.get('/customers', { limit: 5 })
    await api.post('/customers', {})
  } finally {
    globalThis.fetch = realFetch
  }

  assert.equal(calls[0]!.url, 'https://api.stripe.com/v1/customers?limit=5')
  assert.equal(calls[0]!.init.headers['Stripe-Version'], '2025-01-01')
  assert.equal(calls[0]!.init.body, undefined)
  assert.equal(calls[1]!.init.headers['Stripe-Version'], '2025-01-01')
})

test('a GET with no query does not gain a trailing question mark', async () => {
  const calls: string[] = []
  const realFetch = globalThis.fetch
  globalThis.fetch = (async (url: any) => {
    calls.push(String(url))
    return new Response('{}', { status: 200 })
  }) as typeof fetch
  try {
    await new StripeApi('sk_test').get('/customers')
  } finally {
    globalThis.fetch = realFetch
  }

  assert.equal(calls[0], 'https://api.stripe.com/v1/customers')
})

test('an empty Stripe response body is an empty object, not a parse error', async () => {
  const realFetch = globalThis.fetch
  globalThis.fetch = (async () => new Response('', { status: 200 })) as typeof fetch
  try {
    const result = await new StripeApi('sk_test').post('/customers', {})
    assert.deepEqual(result, {})
  } finally {
    globalThis.fetch = realFetch
  }
})

test('a signed-in buyer with no email gets a customer keyed only on the owner', async () => {
  const kysely = createTestDb()
  const { stripeApi, posts } = createServices(kysely, { replies: { '/customers': { id: 'cus_1' } } })

  const owner = { type: 'user', id: 'user_1' }
  const first = await ensureCustomer(stripeApi as any, kysely, owner)
  const second = await ensureCustomer(stripeApi as any, kysely, owner)

  assert.deepEqual(posts[0]!.body, { metadata: { ownerType: 'user', ownerId: 'user_1' } })
  assert.equal(posts.length, 1)
  assert.equal(second!.id, first!.id)

  const row = await kysely
    .selectFrom('paymentCustomer')
    .select(['email'])
    .where('id', '=', first!.id)
    .executeTakeFirstOrThrow()
  assert.equal(row.email, null)
})

test('an order falls back to the requested price when Stripe returns no total', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, {
    replies: {
      '/checkout/sessions': { id: 'cs_1', url: 'https://c/1', amount_total: null, currency: null },
      '/customers': { id: 'cus_1' },
    },
  })

  const result = await createCheckout.func(
    services,
    {
      mode: 'payment',
      priceData: { amountMinor: 1200, currency: 'gbp', productName: 'Hour' },
      successUrl: 'https://s',
      cancelUrl: 'https://c',
    },
    {} as any
  )

  const order = await kysely
    .selectFrom('paymentOrder')
    .select(['amountMinor', 'currency'])
    .where('id', '=', result!.orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.amountMinor, 1200)
  assert.equal(order.currency, 'gbp')
})

test('a checkout by price id with no total and no inline price records zero rather than NaN', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, {
    replies: {
      '/checkout/sessions': { id: 'cs_1', url: 'https://c/1', amount_total: null, currency: null },
    },
  })

  const result = await createCheckout.func(
    services,
    { mode: 'payment', priceId: 'price_1', successUrl: 'https://s', cancelUrl: 'https://c' },
    {} as any
  )

  const order = await kysely
    .selectFrom('paymentOrder')
    .select(['amountMinor', 'currency', 'customerId'])
    .where('id', '=', result!.orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.amountMinor, 0)
  assert.equal(order.currency, 'usd')
  assert.equal(order.customerId, null)
})

test('an anonymous cart checkout attaches no customer and still stores metadata', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, {
    replies: {
      '/checkout/sessions': { id: 'cs_1', url: 'https://c/1', amount_total: 5000, currency: 'eur' },
    },
  })
  const { variantId } = await seedProduct(kysely, { requiresShipping: false })
  const cart = await setCartItem.func(services, { variantId, quantity: 2 }, {} as any)

  const result = await createCartCheckout.func(
    services,
    {
      token: cart!.token,
      successUrl: 'https://s',
      cancelUrl: 'https://c',
      metadata: { source: 'newsletter' },
    },
    {} as any
  )

  const call = posts.find((p) => p.path === '/checkout/sessions')!
  assert.equal(call.body.customer, undefined)

  const order = await kysely
    .selectFrom('paymentOrder')
    .select(['customerId', 'metadata'])
    .where('id', '=', result!.orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.customerId, null)
  assert.deepEqual(JSON.parse(order.metadata!), { source: 'newsletter' })
})

test('a product and variant can be saved inactive from the start', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, {
    replies: { '/products': { id: 'prod_1' }, '/prices': { id: 'price_1' } },
  })

  const result = await saveProduct.func(
    services,
    {
      slug: 'draft',
      name: 'Draft',
      active: false,
      variants: [{ name: 'Standard', amountMinor: 100, currency: 'eur', active: false }],
    },
    {} as any
  )

  const product = await kysely
    .selectFrom('paymentProduct')
    .select(['active'])
    .where('id', '=', result!.id)
    .executeTakeFirstOrThrow()
  const variant = await kysely
    .selectFrom('paymentVariant')
    .select(['active'])
    .where('id', '=', result!.variantIds[0]!)
    .executeTakeFirstOrThrow()
  assert.equal(product.active, 0)
  assert.equal(variant.active, 0)
})

test('a subscription event with no status is recorded as unknown rather than null', async () => {
  const kysely = createTestDb()
  const body = JSON.stringify({
    id: 'evt_sub',
    type: 'customer.subscription.created',
    data: { object: { id: 'sub_1' } },
  })
  const timestamp = Math.floor(Date.now() / 1000)
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode('whsec_test'),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${timestamp}.${body}`))
  const signature = `t=${timestamp},v1=${Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')}`

  await handleStripeWebhook.func(
    { kysely, logger: createLogger(), stripeSignature: new StripeSignature('whsec_test') } as any,
    {},
    {
      http: {
        request: {
          header: () => signature,
          headers: () => ({}),
          arrayBuffer: async () => new TextEncoder().encode(body).buffer,
        },
      },
    } as any
  )

  const row = await kysely
    .selectFrom('paymentSubscription')
    .select(['status'])
    .executeTakeFirstOrThrow()
  assert.equal(row.status, 'unknown')
})

test('a cart checkout for a known buyer attaches the Stripe customer to the order', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, {
    replies: {
      '/checkout/sessions': { id: 'cs_1', url: 'https://c/1', amount_total: 5000, currency: 'eur' },
      '/customers': { id: 'cus_1' },
    },
  })
  const { variantId } = await seedProduct(kysely, { requiresShipping: false })
  const cart = await setCartItem.func(services, { variantId, quantity: 2 }, {} as any)

  const result = await createCartCheckout.func(
    services,
    {
      token: cart!.token,
      successUrl: 'https://s',
      cancelUrl: 'https://c',
      email: 'ada@example.com',
    },
    { session: { userId: 'user_1' } } as any
  )

  const call = posts.find((p) => p.path === '/checkout/sessions')!
  assert.equal(call.body.customer, 'cus_1')

  const order = await kysely
    .selectFrom('paymentOrder')
    .select(['customerId', 'email'])
    .where('id', '=', result!.orderId)
    .executeTakeFirstOrThrow()
  assert.equal(order.email, 'ada@example.com')
  const customer = await kysely
    .selectFrom('paymentCustomer')
    .select(['id', 'ownerType', 'ownerId'])
    .executeTakeFirstOrThrow()
  assert.equal(order.customerId, customer.id)
  assert.equal(customer.ownerType, 'user')
  assert.equal(customer.ownerId, 'user_1')
})
