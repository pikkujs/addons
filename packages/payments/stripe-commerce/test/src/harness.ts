import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import SQLite from 'better-sqlite3'
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely'
import type { PaymentDatabase } from '@pikku/addon-stripe-commerce/types'
import { SessionPaymentOwner } from '@pikku/addon-stripe-commerce'
import type { PaymentOwner } from '@pikku/addon-stripe-commerce'

const SCHEMA = fileURLToPath(
  new URL('../../db/sqlite/0001-payments.sql', import.meta.url)
)

/**
 * A real database on the addon's own shipped schema, so a test proves the SQL
 * and the Kysely types agree rather than proving a mock agrees with itself.
 * The CamelCasePlugin is how a consumer maps the snake_case columns onto the
 * camelCase `PaymentDatabase` interface, so it belongs here too.
 */
export const createTestDb = () => {
  const sqlite = new SQLite(':memory:')
  sqlite.exec(readFileSync(SCHEMA, 'utf8'))
  return new Kysely<PaymentDatabase>({
    dialect: new SqliteDialect({ database: sqlite }),
    plugins: [new CamelCasePlugin()],
  })
}

export const createLogger = () => ({
  warned: [] as string[],
  errored: [] as string[],
  debugged: [] as string[],
  warn(message: string) {
    this.warned.push(message)
  },
  error(message: string) {
    this.errored.push(message)
  },
  debug(message: string) {
    this.debugged.push(message)
  },
})

export type StripePost = {
  path: string
  body: Record<string, any>
  idempotencyKey?: string
}

/**
 * The service bag a function receives, with Stripe replaced by a recorder.
 * `replies` maps a path prefix onto the object Stripe would have returned, so a
 * test says what Stripe answers and then asserts on what was asked.
 */
export const createServices = (
  kysely: Kysely<PaymentDatabase>,
  options: {
    replies?: Record<string, unknown | ((post: StripePost) => unknown)>
    fail?: string
    paymentOwner?: PaymentOwner
  } = {}
) => {
  const posts: StripePost[] = []
  const logger = createLogger()
  const replyFor = (post: StripePost) => {
    for (const [prefix, reply] of Object.entries(options.replies ?? {})) {
      if (post.path.startsWith(prefix)) {
        return typeof reply === 'function' ? reply(post) : reply
      }
    }
    return { id: `stripe_${posts.length}` }
  }
  const stripeApi = {
    post: async (path: string, body: Record<string, any> = {}, idempotencyKey?: string) => {
      const post = { path, body, idempotencyKey }
      posts.push(post)
      if (options.fail && path.startsWith(options.fail)) {
        throw new Error(`Stripe POST ${path} failed (402): declined`)
      }
      return replyFor(post)
    },
  }
  const paymentOwner = options.paymentOwner ?? new SessionPaymentOwner()
  return {
    posts,
    logger,
    stripeApi,
    kysely,
    services: { stripeApi, kysely, logger, paymentOwner } as any,
  }
}

const NOW = '2026-08-31T12:00:00.000Z'

export const seedProduct = async (
  kysely: Kysely<PaymentDatabase>,
  options: {
    requiresShipping?: boolean
    stock?: number | null
    amountMinor?: number
  } = {}
) => {
  const productId = crypto.randomUUID()
  const variantId = crypto.randomUUID()
  await kysely
    .insertInto('paymentProduct')
    .values({
      id: productId,
      slug: `p-${productId.slice(0, 8)}`,
      name: 'Kettle',
      description: null,
      imageUrl: null,
      requiresShipping: (options.requiresShipping ?? true) ? 1 : 0,
      active: 1,
      stripeProductId: 'prod_test',
      metadata: null,
      createdAt: NOW,
      updatedAt: NOW,
    })
    .execute()
  await kysely
    .insertInto('paymentVariant')
    .values({
      id: variantId,
      productId,
      name: 'Standard',
      sku: `sku-${variantId.slice(0, 8)}`,
      amountMinor: options.amountMinor ?? 2500,
      currency: 'eur',
      stock: options.stock === undefined ? 10 : options.stock,
      position: 0,
      active: 1,
      stripePriceId: 'price_test',
      createdAt: NOW,
      updatedAt: NOW,
    })
    .execute()
  return { productId, variantId }
}

export const seedCartOrder = async (
  kysely: Kysely<PaymentDatabase>,
  variantId: string,
  options: { captureMethod?: 'automatic' | 'manual'; quantity?: number } = {}
) => {
  const cartId = crypto.randomUUID()
  const orderId = crypto.randomUUID()
  const sessionId = `cs_${orderId.slice(0, 8)}`
  await kysely
    .insertInto('paymentCart')
    .values({
      id: cartId,
      token: crypto.randomUUID(),
      ownerType: null,
      ownerId: null,
      email: null,
      status: 'open',
      createdAt: NOW,
      updatedAt: NOW,
    })
    .execute()
  await kysely
    .insertInto('paymentOrder')
    .values({
      id: orderId,
      customerId: null,
      cartId,
      email: null,
      stripeCheckoutSessionId: sessionId,
      stripePaymentIntentId: null,
      amountMinor: 2500,
      amountRefundedMinor: 0,
      currency: 'eur',
      status: 'pending',
      captureMethod: options.captureMethod ?? 'automatic',
      amountCapturedMinor: null,
      fulfillmentStatus: 'unfulfilled',
      shippingName: null,
      shippingLine1: null,
      shippingLine2: null,
      shippingCity: null,
      shippingState: null,
      shippingPostalCode: null,
      shippingCountry: null,
      disputeStatus: null,
      trackingNumber: null,
      trackingUrl: null,
      shippedAt: null,
      metadata: null,
      createdAt: NOW,
      updatedAt: NOW,
    })
    .execute()
  await kysely
    .insertInto('paymentOrderItem')
    .values({
      id: crypto.randomUUID(),
      orderId,
      variantId,
      name: 'Kettle — Standard',
      sku: null,
      quantity: options.quantity ?? 2,
      unitAmountMinor: 2500,
      currency: 'eur',
      requiresShipping: 1,
    })
    .execute()
  return { cartId, orderId, sessionId }
}
