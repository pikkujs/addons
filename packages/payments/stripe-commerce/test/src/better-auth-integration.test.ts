import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import assert from 'node:assert/strict'
import test from 'node:test'
import SQLite from 'better-sqlite3'
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely'
import {
  BetterAuthPaymentOwner,
  createCartCheckout,
  handleStripeWebhook,
  setCartItem,
  StripeSignature,
} from '@pikku/addon-stripe-commerce'
import { createServices, seedProduct } from './harness.js'

const SCHEMA = fileURLToPath(new URL('../../db/sqlite/0001-payments.sql', import.meta.url))

const SECRET = 'whsec_test'

/**
 * One database holding both halves: the addon's tables and the columns
 * better-auth's Stripe plugin adds. That is the arrangement an app actually
 * runs, and the only one in which the seam between them can be proved.
 */
const createAppDb = () => {
  const sqlite = new SQLite(':memory:')
  sqlite.exec(readFileSync(SCHEMA, 'utf8'))
  sqlite.exec(`
    CREATE TABLE user (id TEXT PRIMARY KEY, email TEXT, stripe_customer_id TEXT);
    CREATE TABLE subscription (
      id TEXT PRIMARY KEY,
      plan TEXT,
      reference_id TEXT,
      stripe_customer_id TEXT,
      stripe_subscription_id TEXT,
      status TEXT
    );
  `)
  return new Kysely<any>({
    dialect: new SqliteDialect({ database: sqlite }),
    plugins: [new CamelCasePlugin()],
  })
}

const signed = async (body: string) => {
  const timestamp = Math.floor(Date.now() / 1000)
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(SECRET),
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

const deliver = async (services: any, event: Record<string, unknown>) => {
  const body = JSON.stringify(event)
  const signature = await signed(body)
  return handleStripeWebhook.func(
    { ...services, stripeSignature: new StripeSignature(SECRET) },
    {},
    {
      http: {
        request: {
          header: (name: string) => (name === 'stripe-signature' ? signature : null),
          headers: () => ({ 'stripe-signature': signature }),
          arrayBuffer: async () => new TextEncoder().encode(body).buffer,
        },
      },
    } as any
  )
}

test('a signed-in buyer checks out onto the customer better-auth already made', async () => {
  const kysely = createAppDb()
  await kysely
    .insertInto('user')
    .values({ id: 'user_1', email: 'ada@example.com', stripeCustomerId: 'cus_ba' })
    .execute()

  const { services, posts } = createServices(kysely, {
    replies: { '/checkout/sessions': { id: 'cs_1', url: 'https://pay', amount_total: 2500 } },
    paymentOwner: new BetterAuthPaymentOwner(kysely),
  })
  const { variantId } = await seedProduct(kysely, { requiresShipping: false })

  const session = { session: { userId: 'user_1' } } as any
  const cart = await setCartItem.func(services, { variantId, quantity: 1 }, session)
  const order = await createCartCheckout.func(
    services,
    { token: cart!.token, successUrl: 'https://s', cancelUrl: 'https://c' },
    session
  )

  assert.equal(
    posts.some((post) => post.path === '/customers'),
    false,
    'the storefront must not mint a second Stripe customer'
  )
  const checkout = posts.find((post) => post.path === '/checkout/sessions')!
  assert.equal(checkout.body.customer, 'cus_ba')

  const customers = await kysely.selectFrom('paymentCustomer').selectAll().execute()
  assert.equal(customers.length, 1)
  assert.equal(customers[0]!.stripeCustomerId, 'cus_ba')
  assert.equal(customers[0]!.ownerType, 'user')
  assert.equal(customers[0]!.ownerId, 'user_1')
  assert.equal(customers[0]!.email, 'ada@example.com')

  const cartRow = await kysely
    .selectFrom('paymentCart')
    .selectAll()
    .where('token', '=', cart!.token)
    .executeTakeFirstOrThrow()
  assert.equal(cartRow.ownerId, 'user_1')

  const orderRow = await kysely
    .selectFrom('paymentOrder')
    .selectAll()
    .where('id', '=', order!.orderId)
    .executeTakeFirstOrThrow()
  assert.equal(orderRow.customerId, customers[0]!.id)
})

test('a subscription on the shared customer is acknowledged and left alone', async () => {
  const kysely = createAppDb()
  await kysely
    .insertInto('user')
    .values({ id: 'user_1', email: 'ada@example.com', stripeCustomerId: 'cus_ba' })
    .execute()

  const { services } = createServices(kysely, { paymentOwner: new BetterAuthPaymentOwner(kysely) })

  const result = await deliver(services, {
    id: 'evt_sub',
    type: 'customer.subscription.created',
    data: {
      object: {
        id: 'sub_plan',
        status: 'active',
        customer: 'cus_ba',
        cancel_at_period_end: false,
        items: { data: [{ price: { id: 'price_pro_plan' }, current_period_end: 1790000000 }] },
      },
    },
  })

  // Same Stripe customer, same webhook fan-out, and still nothing of the plan
  // lands here: subscriptions belong to whatever sells them.
  assert.equal(result?.received, true)
  assert.equal(result?.processed, false)
  const events = await kysely.selectFrom('paymentWebhookEvent').selectAll().execute()
  assert.equal(events.length, 0)
})
