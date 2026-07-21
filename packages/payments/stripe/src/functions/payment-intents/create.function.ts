import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema, PaymentIntentSchema } from '../../stripe.types.js'

export const PaymentIntentCreateInput = z.object({
  amount: z.number().describe('Amount to charge in the smallest currency unit (e.g. 500 = $5.00)'),
  currency: z.string().optional().describe('Three-letter ISO currency code, lowercase. Defaults to usd'),
  customer: z.string().optional().describe('The Stripe customer id to charge or attach the payment to'),
  payment_method: z.string().optional().describe('A saved payment method id to charge. Provide for off-session charges (e.g. auto-recharge); omit for a client-side Elements/Payment Element flow that collects the card in the browser'),
  off_session: z.boolean().optional().describe('Set true when charging a saved card without the customer present (e.g. AI pot auto-recharge). Defaults to true only when a payment_method is supplied'),
  confirm: z.boolean().optional().describe('Confirm the payment intent immediately. Defaults to true when a payment_method is supplied (charge now), otherwise false so the client confirms with the returned client_secret'),
  capture_method: z.enum(['automatic', 'automatic_async', 'manual']).optional().describe('Set manual to authorize now and capture later (auth-then-capture). Defaults to automatic'),
  setup_future_usage: z.enum(['on_session', 'off_session']).optional().describe('Save the payment method for future use. off_session lets you charge it later without the customer present'),
  automatic_payment_methods: z.boolean().optional().describe('Enable Stripe-managed automatic payment methods (recommended for Payment Element). Ignored when a payment_method is supplied'),
  description: z.string().optional().describe('An arbitrary string attached to the payment intent, shown in the dashboard'),
  receipt_email: z.string().optional().describe('Email address to send the receipt to'),
  idempotency_key: z.string().optional().describe('Idempotency key so a retried create does not double-charge'),
  metadata: MetadataSchema.optional().describe('Key-value pairs attached to the payment intent (e.g. { purpose: "ai_topup", organizationId })'),
})

export const PaymentIntentCreateOutput = PaymentIntentSchema

type Output = z.infer<typeof PaymentIntentCreateOutput>

export const paymentIntentCreate = pikkuSessionlessFunc({
  description: 'Create a payment intent. Supply a saved payment_method for an off-session charge (AI pot auto-recharge), or omit it and hand the returned client_secret to Stripe Elements for a custom checkout',
  node: { displayName: 'Create Payment Intent', category: 'Payment Intents', type: 'action' },
  input: PaymentIntentCreateInput,
  output: PaymentIntentCreateOutput,
  func: async ({ stripe }, data) => {
    const confirm = data.confirm ?? Boolean(data.payment_method)
    return await stripe.paymentIntents.create(
      {
        amount: data.amount,
        currency: data.currency ?? 'usd',
        ...(data.customer ? { customer: data.customer } : {}),
        ...(data.payment_method ? { payment_method: data.payment_method } : {}),
        confirm,
        // off_session only makes sense when charging a saved method now.
        ...(data.payment_method && confirm ? { off_session: data.off_session ?? true } : {}),
        ...(data.capture_method ? { capture_method: data.capture_method } : {}),
        ...(data.setup_future_usage ? { setup_future_usage: data.setup_future_usage } : {}),
        ...(data.automatic_payment_methods && !data.payment_method
          ? { automatic_payment_methods: { enabled: true } }
          : {}),
        ...(data.description ? { description: data.description } : {}),
        ...(data.receipt_email ? { receipt_email: data.receipt_email } : {}),
        ...(data.metadata ? { metadata: data.metadata } : {}),
      },
      data.idempotency_key ? { idempotencyKey: data.idempotency_key } : undefined,
    ) as unknown as Output
  },
})
