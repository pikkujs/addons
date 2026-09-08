import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import { loadCart } from '../../lib/cart.js'
import { ensureVariantPrice, pushShippingRate } from '../../lib/stripe-catalog.js'
import { ensureCustomer } from '../../lib/customer.js'
import type { FormValue } from '../../lib/form-encode.js'

/**
 * Used when a cart needs a shipping address and the caller did not say which
 * countries the shop ships to. Stripe requires an explicit list, so there is no
 * "everywhere" to fall back on; this is a workable default a shop overrides
 * per call once it knows where it actually ships.
 */
const DEFAULT_SHIPPING_COUNTRIES = [
  'US', 'CA', 'GB', 'IE', 'AU', 'NZ', 'DE', 'FR', 'ES', 'IT', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'PT', 'PL',
]

export const CreateCartCheckoutInput = z.object({
  token: z.string().describe('The cart token to check out'),
  successUrl: z.string().describe('Where to send the customer after a successful payment'),
  cancelUrl: z.string().describe('Where to send the customer if they cancel'),
  email: z.string().optional().describe('Prefilled at checkout and stored on the order'),
  shippingCountries: z
    .array(z.string())
    .optional()
    .describe('Two-letter ISO country codes the shop ships to. Only used when the cart contains a physical product'),
  allowPromotionCodes: z
    .boolean()
    .optional()
    .describe('Show the promotion code field at checkout, redeeming codes created in Stripe. Defaults to true'),
  automaticTax: z
    .boolean()
    .optional()
    .describe('Let Stripe Tax calculate tax. Requires Stripe Tax to be enabled on the account. Defaults to false'),
  captureMethod: z
    .enum(['automatic', 'manual'])
    .optional()
    .describe(
      'manual authorises the card at checkout and charges it later via captureOrder — use it to avoid refunding an item you cannot ship. One-off payments only; a card authorisation expires after 7 days. Defaults to automatic'
    ),
  metadata: z.record(z.string(), z.string()).optional().describe('Copied onto the Stripe objects and echoed back on the webhook'),
})

export const CreateCartCheckoutOutput = z.object({
  orderId: z.string().describe('The pending order the webhook later settles'),
  sessionId: z.string().describe('The Stripe checkout session id'),
  url: z.string().describe('The hosted checkout URL to redirect the customer to'),
})

type StripeCheckoutSession = {
  id: string
  url: string | null
  customer: string | null
  amount_total: number | null
  currency: string | null
}

/**
 * Turns a cart into a Stripe Checkout session and a pending order.
 *
 * The order and its item snapshot are written here, before the customer pays,
 * because the webhook needs to know what was bought in order to settle it — the
 * Stripe session carries prices, not variant ids. Stock is checked here but
 * only decremented once `checkout.session.completed` arrives; holding stock
 * across an abandoned checkout would need an expiry sweeper, and overselling a
 * few units is the cheaper failure for a small shop.
 */
export const createCartCheckout = pikkuSessionlessFunc({
  description: 'Create a Stripe Checkout session from a cart, recording a pending order with its line items',
  node: { displayName: 'Checkout Cart', category: 'Checkout', type: 'action' },
  input: CreateCartCheckoutInput,
  output: CreateCartCheckoutOutput,
  tags: ['addon'],
  func: async ({ stripeApi, kysely, paymentOwner }, data, { session: userSession }) => {
    const found = await kysely
      .selectFrom('paymentCart')
      .select(['id'])
      .where('token', '=', data.token)
      .where('status', '=', 'open')
      .executeTakeFirst()
    if (!found) {
      throw new BadRequestError('No open cart for that token')
    }

    const cart = await loadCart(kysely, found.id)
    if (cart.lines.length === 0) {
      throw new BadRequestError('Cart is empty')
    }
    const unavailable = cart.lines.find((line) => !line.available)
    if (unavailable) {
      throw new BadRequestError(
        `${unavailable.productName} — ${unavailable.variantName} only has ${unavailable.stock} left`
      )
    }
    const captureMethod = data.captureMethod ?? 'automatic'

    const lineItems: FormValue[] = []
    for (const line of cart.lines) {
      const priceId = await ensureVariantPrice(stripeApi, kysely, line.variantId)
      lineItems.push({ price: priceId, quantity: line.quantity })
    }

    const orderId = crypto.randomUUID()
    const metadata = { ...(data.metadata ?? {}), paymentOrderId: orderId }

    let shipping: Record<string, FormValue> = {}
    if (cart.requiresShipping) {
      const rates = await kysely
        .selectFrom('paymentShippingRate')
        .selectAll()
        .where('active', '=', 1)
        .orderBy('position', 'asc')
        .execute()

      const shippingOptions: FormValue[] = []
      for (const rate of rates) {
        let rateId = rate.stripeShippingRateId
        if (!rateId) {
          rateId = await pushShippingRate(stripeApi, rate)
          await kysely
            .updateTable('paymentShippingRate')
            .set({ stripeShippingRateId: rateId, updatedAt: new Date().toISOString() })
            .where('id', '=', rate.id)
            .execute()
        }
        shippingOptions.push({ shipping_rate: rateId })
      }

      shipping = {
        shipping_address_collection: {
          allowed_countries: data.shippingCountries ?? DEFAULT_SHIPPING_COUNTRIES,
        },
        ...(shippingOptions.length > 0 ? { shipping_options: shippingOptions } : {}),
      }
    }

    // Created before the session so Stripe attaches the purchase to a real
    // customer: a repeat buyer keeps one customer, and a saved mandate or the
    // billing portal has something to hang off.
    const owner = await paymentOwner.resolve(userSession)
    const customer = await ensureCustomer(stripeApi, kysely, owner, data.email)

    const session = await stripeApi.post<StripeCheckoutSession>(
      '/checkout/sessions',
      {
        mode: 'payment',
        line_items: lineItems,
        success_url: data.successUrl,
        cancel_url: data.cancelUrl,
        client_reference_id: orderId,
        allow_promotion_codes: data.allowPromotionCodes ?? true,
        ...(data.automaticTax ? { automatic_tax: { enabled: true } } : {}),
        ...(customer ? { customer: customer.stripeCustomerId } : {}),
        ...shipping,
        metadata,
        payment_intent_data: { metadata, capture_method: captureMethod },
      },
      orderId
    )

    if (!session.url) {
      throw new Error('Stripe returned a checkout session with no URL')
    }

    const now = new Date().toISOString()
    await kysely
      .insertInto('paymentOrder')
      .values({
        id: orderId,
        customerId: customer?.id ?? null,
        cartId: cart.id,
        email: data.email ?? null,
        stripeCheckoutSessionId: session.id,
        stripePaymentIntentId: null,
        amountMinor: session.amount_total ?? cart.subtotalMinor,
        amountRefundedMinor: 0,
        currency: session.currency ?? cart.lines[0]!.currency,
        status: 'pending',
        captureMethod,
        amountCapturedMinor: null,
        fulfillmentStatus: cart.requiresShipping ? 'unfulfilled' : 'not_required',
        shippingName: null,
        shippingLine1: null,
        shippingLine2: null,
        shippingCity: null,
        shippingState: null,
        shippingPostalCode: null,
        shippingCountry: null,
        trackingNumber: null,
        trackingUrl: null,
        shippedAt: null,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
        createdAt: now,
        updatedAt: now,
      })
      .execute()

    await kysely
      .insertInto('paymentOrderItem')
      .values(
        cart.lines.map((line) => ({
          id: crypto.randomUUID(),
          orderId,
          variantId: line.variantId,
          name: `${line.productName} — ${line.variantName}`,
          sku: line.sku,
          quantity: line.quantity,
          unitAmountMinor: line.unitAmountMinor,
          currency: line.currency,
          requiresShipping: line.requiresShipping ? 1 : 0,
        }))
      )
      .execute()

    return { orderId, sessionId: session.id, url: session.url }
  },
})
