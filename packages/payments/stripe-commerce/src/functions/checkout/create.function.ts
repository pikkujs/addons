import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { FormValue } from '../../lib/form-encode.js'
import { ensureCustomer } from '../../lib/customer.js'

export const CreateCheckoutInput = z.object({
  mode: z
    .enum(['payment', 'subscription'])
    .describe('payment for a one-off purchase, subscription for a recurring plan'),
  priceId: z
    .string()
    .optional()
    .describe('An existing Stripe price id. Provide this or priceData'),
  priceData: z
    .object({
      amountMinor: z
        .number()
        .int()
        .positive()
        .describe('Amount in the currency\'s minor unit (500 = $5.00, but 500 = ¥500 for JPY)'),
      currency: z.string().describe('Three-letter ISO currency code, lowercase'),
      productName: z.string().describe('Product name shown to the customer at checkout'),
      interval: z
        .enum(['day', 'week', 'month', 'year'])
        .optional()
        .describe('Billing frequency. Required in subscription mode'),
    })
    .optional()
    .describe('An inline price, so a caller can charge a dynamic amount without pre-creating a Price'),
  quantity: z.number().int().positive().optional().describe('Line item quantity. Defaults to 1'),
  successUrl: z.string().describe('Where to send the customer after a successful payment'),
  cancelUrl: z.string().describe('Where to send the customer if they cancel'),
  email: z.string().optional().describe('Customer email, prefilled at checkout'),
  captureMethod: z
    .enum(['automatic', 'manual'])
    .optional()
    .describe(
      'manual authorises the card at checkout and charges it later via captureOrder. Payment mode only; a card authorisation expires after 7 days. Defaults to automatic'
    ),
  metadata: z
    .record(z.string(), z.string())
    .optional()
    .describe('Key-value pairs copied onto the Stripe objects and echoed back on the webhook'),
})

export const CreateCheckoutOutput = z.object({
  orderId: z.string().describe('The payment_order row created for this checkout'),
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

export const createCheckout = pikkuSessionlessFunc({
  description:
    'Create a Stripe Checkout session for a one-off payment or a subscription, recording a pending order the webhook later settles',
  node: { displayName: 'Create Checkout', category: 'Checkout', type: 'action' },
  input: CreateCheckoutInput,
  output: CreateCheckoutOutput,
  tags: ['addon'],
  func: async ({ stripeApi, kysely, paymentOwner }, data, { session: userSession }) => {
    if (!data.priceId && !data.priceData) {
      throw new BadRequestError('Provide either priceId or priceData')
    }
    if (data.mode === 'subscription' && data.priceData && !data.priceData.interval) {
      throw new BadRequestError('priceData.interval is required in subscription mode')
    }

    const captureMethod = data.captureMethod ?? 'automatic'
    if (captureMethod === 'manual' && data.mode === 'subscription') {
      throw new BadRequestError('A subscription cannot be authorised and captured later')
    }

    const orderId = crypto.randomUUID()
    const now = new Date().toISOString()

    const lineItem: FormValue = data.priceData
      ? {
          quantity: data.quantity ?? 1,
          price_data: {
            currency: data.priceData.currency,
            unit_amount: data.priceData.amountMinor,
            product_data: { name: data.priceData.productName },
            ...(data.priceData.interval ? { recurring: { interval: data.priceData.interval } } : {}),
          },
        }
      : { price: data.priceId, quantity: data.quantity ?? 1 }

    const metadata = { ...(data.metadata ?? {}), paymentOrderId: orderId }

    const owner = await paymentOwner.resolve(userSession)
    const customer = await ensureCustomer(stripeApi, kysely, owner, data.email)

    const session = await stripeApi.post<StripeCheckoutSession>(
      '/checkout/sessions',
      {
        mode: data.mode,
        line_items: [lineItem],
        success_url: data.successUrl,
        cancel_url: data.cancelUrl,
        client_reference_id: orderId,
        ...(customer ? { customer: customer.stripeCustomerId } : {}),
        metadata,
        ...(data.mode === 'payment'
          ? { payment_intent_data: { metadata, capture_method: captureMethod } }
          : {}),
        ...(data.mode === 'subscription' ? { subscription_data: { metadata } } : {}),
      },
      orderId
    )

    if (!session.url) {
      throw new Error('Stripe returned a checkout session with no URL')
    }

    await kysely
      .insertInto('paymentOrder')
      .values({
        id: orderId,
        customerId: customer?.id ?? null,
        cartId: null,
        email: data.email ?? null,
        stripeCheckoutSessionId: session.id,
        stripePaymentIntentId: null,
        amountMinor: session.amount_total ?? data.priceData?.amountMinor ?? 0,
        amountRefundedMinor: 0,
        currency: session.currency ?? data.priceData?.currency ?? 'usd',
        status: 'pending',
        captureMethod,
        amountCapturedMinor: null,
        fulfillmentStatus: 'not_required',
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

    return { orderId, sessionId: session.id, url: session.url }
  },
})
