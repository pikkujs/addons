import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema, PaymentIntentSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const PaymentIntentCreateInput = z.object({
  amount: z.number().describe('Amount to charge in the smallest currency unit (e.g. 500 = $5.00)'),
  currency: z.string().optional().describe('Three-letter ISO currency code, lowercase. Defaults to usd'),
  customer: z.string().optional().describe('The Stripe customer id to charge or attach the payment to'),
  paymentMethod: z.string().optional().describe('A saved payment method id to charge. Provide for off-session charges (e.g. auto-recharge); omit for a client-side Elements/Payment Element flow that collects the card in the browser'),
  offSession: z.boolean().optional().describe('Set true when charging a saved card without the customer present (e.g. AI pot auto-recharge). Defaults to true only when a paymentMethod is supplied'),
  confirm: z.boolean().optional().describe('Confirm the payment intent immediately. Defaults to true when a paymentMethod is supplied (charge now), otherwise false so the client confirms with the returned clientSecret'),
  captureMethod: z.enum(['automatic', 'automatic_async', 'manual']).optional().describe('Set manual to authorize now and capture later (auth-then-capture). Defaults to automatic'),
  setupFutureUsage: z.enum(['on_session', 'off_session']).optional().describe('Save the payment method for future use. off_session lets you charge it later without the customer present'),
  automaticPaymentMethods: z.boolean().optional().describe('Enable Stripe-managed automatic payment methods (recommended for Payment Element). Ignored when a paymentMethod is supplied'),
  description: z.string().optional().describe('An arbitrary string attached to the payment intent, shown in the dashboard'),
  receiptEmail: z.string().optional().describe('Email address to send the receipt to'),
  idempotencyKey: z.string().optional().describe('Idempotency key so a retried create does not double-charge'),
  metadata: MetadataSchema.optional().describe('Key-value pairs attached to the payment intent (e.g. { purpose: "ai_topup", organizationId })'),
})

export const PaymentIntentCreateOutput = PaymentIntentSchema

export const paymentIntentCreate = pikkuSessionlessFunc({
  description: 'Create a payment intent. Supply a saved paymentMethod for an off-session charge (AI pot auto-recharge), or omit it and hand the returned clientSecret to Stripe Elements for a custom checkout',
  node: { displayName: 'Create Payment Intent', category: 'Payment Intents', type: 'action' },
  input: PaymentIntentCreateInput,
  output: PaymentIntentCreateOutput,
  func: async ({ stripe }, data) => {
    const confirm = data.confirm ?? Boolean(data.paymentMethod)
    const result = await stripe.paymentIntents.create(
      {
        amount: data.amount,
        currency: data.currency ?? 'usd',
        ...(data.customer ? { customer: data.customer } : {}),
        ...(data.paymentMethod ? { payment_method: data.paymentMethod } : {}),
        confirm,
        // off_session only makes sense when charging a saved method now.
        ...(data.paymentMethod && confirm ? { off_session: data.offSession ?? true } : {}),
        ...(data.captureMethod ? { capture_method: data.captureMethod } : {}),
        ...(data.setupFutureUsage ? { setup_future_usage: data.setupFutureUsage } : {}),
        ...(data.automaticPaymentMethods && !data.paymentMethod
          ? { automatic_payment_methods: { enabled: true } }
          : {}),
        ...(data.description ? { description: data.description } : {}),
        ...(data.receiptEmail ? { receipt_email: data.receiptEmail } : {}),
        ...(data.metadata ? { metadata: data.metadata } : {}),
      },
      data.idempotencyKey ? { idempotencyKey: data.idempotencyKey } : undefined,
    )
    const camel = fromStripeObject(result)
    return PaymentIntentCreateOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})
