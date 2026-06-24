import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema } from '../../stripe.types.js'

export const PaymentIntentCreateInput = z.object({
  amount: z.number().describe('Amount to charge in the smallest currency unit (e.g. 500 = $5.00)'),
  currency: z.string().optional().describe('Three-letter ISO currency code, lowercase. Defaults to usd'),
  customer: z.string().describe('The Stripe customer id to charge'),
  payment_method: z.string().describe('The saved payment method id to charge. Required for off-session charges'),
  off_session: z.boolean().optional().describe('Set true when charging a saved card without the customer present (e.g. AI pot auto-recharge). Defaults to true'),
  confirm: z.boolean().optional().describe('Confirm the payment intent immediately. Defaults to true so the charge runs now'),
  idempotency_key: z.string().optional().describe('Idempotency key so a retried auto-recharge does not double-charge'),
  metadata: MetadataSchema.optional().describe('Key-value pairs attached to the payment intent (e.g. { purpose: "ai_topup", organization_id })'),
})

export const PaymentIntentCreateOutput = z.object({
  id: z.string().describe('Unique identifier for the object (pi_...)'),
  object: z.literal('payment_intent').describe('String representing the object\'s type'),
  amount: z.number().describe('Amount intended to be collected by this payment'),
  currency: z.string().describe('Three-letter ISO currency code'),
  status: z.string().describe('Status of the payment intent: requires_payment_method, requires_confirmation, processing, succeeded, requires_action, or canceled'),
  customer: z.string().nullable().describe('ID of the customer this payment intent is for'),
  metadata: MetadataSchema,
})

type Output = z.infer<typeof PaymentIntentCreateOutput>

export const paymentIntentCreate = pikkuSessionlessFunc({
  description: 'Create and confirm a payment intent. Used for off-session top-ups (AI pot auto-recharge) on a saved payment method',
  node: { displayName: 'Create Payment Intent', category: 'Payment Intents', type: 'action' },
  input: PaymentIntentCreateInput,
  output: PaymentIntentCreateOutput,
  func: async ({ stripe }, data) => {
    return await stripe.paymentIntents.create(
      {
        amount: data.amount,
        currency: data.currency ?? 'usd',
        customer: data.customer,
        payment_method: data.payment_method,
        off_session: data.off_session ?? true,
        confirm: data.confirm ?? true,
        ...(data.metadata ? { metadata: data.metadata } : {}),
      },
      data.idempotency_key ? { idempotencyKey: data.idempotency_key } : undefined,
    ) as unknown as Output
  },
})
