import Stripe from 'stripe'
import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { MetadataSchema } from '../../stripe.types.js'
import { fromStripeObject } from '../../stripe.transform.js'

// Inline price definition, so callers can charge a dynamic amount (e.g. a
// user-chosen top-up) without pre-creating a Price in the dashboard.
const PriceDataSchema = z.object({
  currency: z.string().describe('Three-letter ISO currency code, lowercase'),
  unitAmount: z.number().describe('A positive integer in the smallest currency unit (e.g. 500 = $5.00)'),
  productName: z.string().describe('The product name shown to the customer on the Checkout page'),
  recurring: z
    .object({
      interval: z.enum(['day', 'week', 'month', 'year']).describe('Billing frequency'),
      intervalCount: z.number().optional().describe('Number of intervals between billings'),
    })
    .optional()
    .describe('Provide in subscription mode to make the inline price recurring'),
})

export const CheckoutSessionCreateInput = z.object({
  mode: z.enum(['subscription', 'payment', 'setup']).describe('The mode of the checkout session. subscription for recurring plans, payment for one-off (e.g. AI top-ups), setup to save a card'),
  priceId: z.string().optional().describe('An existing price id to put on the session line item. Provide this or priceData (not needed in setup mode)'),
  priceData: PriceDataSchema.optional().describe('An inline, dynamically-priced line item, instead of a pre-created priceId'),
  quantity: z.number().optional().describe('Quantity of the line item. Defaults to 1'),
  successUrl: z.string().describe('URL the customer is redirected to after a successful payment. Supports the {CHECKOUT_SESSION_ID} template variable'),
  cancelUrl: z.string().describe('URL the customer is redirected to if they cancel'),
  customer: z.string().optional().describe('Existing Stripe customer id to attach the session to. Reuse the org\'s customer so the subscription/payment lands on it'),
  clientReferenceId: z.string().optional().describe('An opaque value to associate the session with an internal entity (e.g. the organization id). Echoed back on checkout.session.completed'),
  allowPromotionCodes: z.boolean().optional().describe('Let the customer enter a promotion code on the Checkout page'),
  automaticTax: z.boolean().optional().describe('Enable Stripe Tax to automatically calculate and add tax to the session'),
  paymentIntentData: z
    .object({
      metadata: MetadataSchema.optional().describe('Metadata copied onto the underlying PaymentIntent (and its payment_intent.succeeded webhook). Set this — not just session metadata — when you credit a wallet from the webhook, since one-off webhooks carry the PaymentIntent, not the session'),
      setupFutureUsage: z.enum(['on_session', 'off_session']).optional().describe('Save the card used at checkout for future off-session charges'),
    })
    .optional()
    .describe('Payment-mode only: control the one-off PaymentIntent created by this session'),
  subscriptionData: z
    .object({
      metadata: MetadataSchema.optional().describe('Metadata copied onto the created subscription'),
      trialPeriodDays: z.number().optional().describe('Free trial length in days before billing starts'),
    })
    .optional()
    .describe('Subscription-mode only: control the subscription created by this session'),
  metadata: MetadataSchema.optional().describe('Key-value pairs attached to the session'),
})

export const CheckoutSessionCreateOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('checkout.session').describe('String representing the object\'s type'),
  url: z.string().nullable().describe('The URL to redirect the customer to in order to complete the checkout'),
  mode: z.string().describe('The mode of the session'),
  customer: z.string().nullable().describe('ID of the customer for this session'),
  paymentIntent: z.string().nullish().describe('ID of the PaymentIntent created by a payment-mode session'),
  subscription: z.string().nullish().describe('ID of the subscription created by a subscription-mode session'),
  status: z.string().nullable().describe('The status of the session: open, complete or expired'),
})

export const checkoutSessionCreate = pikkuSessionlessFunc({
  description: 'Create a Stripe Checkout session for a subscription plan, a one-off payment, or to save a card, returning a hosted payment URL',
  node: { displayName: 'Create Checkout Session', category: 'Checkout', type: 'action' },
  input: CheckoutSessionCreateInput,
  output: CheckoutSessionCreateOutput,
  func: async ({ stripe }, data) => {
    // Build the line item from an inline priceData or an existing priceId.
    // setup mode takes no line items.
    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem | null = data.priceData
      ? {
          quantity: data.quantity ?? 1,
          price_data: {
            currency: data.priceData.currency,
            unit_amount: data.priceData.unitAmount,
            product_data: { name: data.priceData.productName },
            ...(data.priceData.recurring
              ? {
                  recurring: {
                    interval: data.priceData.recurring.interval,
                    ...(data.priceData.recurring.intervalCount !== undefined
                      ? { interval_count: data.priceData.recurring.intervalCount }
                      : {}),
                  },
                }
              : {}),
          },
        }
      : data.priceId
        ? { price: data.priceId, quantity: data.quantity ?? 1 }
        : null

    const result = await stripe.checkout.sessions.create({
      mode: data.mode,
      ...(data.mode !== 'setup' && lineItem ? { line_items: [lineItem] } : {}),
      success_url: data.successUrl,
      cancel_url: data.cancelUrl,
      ...(data.customer ? { customer: data.customer } : {}),
      ...(data.clientReferenceId ? { client_reference_id: data.clientReferenceId } : {}),
      ...(data.allowPromotionCodes !== undefined ? { allow_promotion_codes: data.allowPromotionCodes } : {}),
      ...(data.automaticTax ? { automatic_tax: { enabled: true } } : {}),
      // payment_intent_data is only valid in payment mode; subscription_data only in subscription mode.
      ...(data.mode === 'payment' && data.paymentIntentData
        ? {
            payment_intent_data: {
              ...(data.paymentIntentData.metadata ? { metadata: data.paymentIntentData.metadata } : {}),
              ...(data.paymentIntentData.setupFutureUsage
                ? { setup_future_usage: data.paymentIntentData.setupFutureUsage }
                : {}),
            },
          }
        : {}),
      ...(data.mode === 'subscription' && data.subscriptionData
        ? {
            subscription_data: {
              ...(data.subscriptionData.metadata ? { metadata: data.subscriptionData.metadata } : {}),
              ...(data.subscriptionData.trialPeriodDays !== undefined
                ? { trial_period_days: data.subscriptionData.trialPeriodDays }
                : {}),
            },
          }
        : {}),
      ...(data.metadata ? { metadata: data.metadata } : {}),
    })
    return CheckoutSessionCreateOutput.parse(fromStripeObject(result))
  },
})
