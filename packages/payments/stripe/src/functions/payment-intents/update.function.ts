import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { MetadataSchema, PaymentIntentSchema } from '../../stripe.types.js'
import { toStripeParams, fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const PaymentIntentUpdateInput = z.object({
  paymentIntentId: z.string().describe('The identifier of the payment intent to update (pi_...)'),
  paymentMethod: z.string().optional().describe('Attach a saved payment method to the intent'),
  paymentMethodTypes: z.array(z.string()).optional().describe('Replace the payment method types the intent may use'),
  paymentMethodOptions: z.record(z.string(), z.unknown()).optional().describe('Per-method options keyed by method type, e.g. { card: { setupFutureUsage: "off_session" }, customerBalance: { fundingType: "bank_transfer", bankTransfer: { ... } } }'),
  amount: z.number().optional().describe('New amount in the smallest currency unit'),
  description: z.string().optional().describe('An arbitrary string attached to the payment intent'),
  metadata: MetadataSchema.optional().describe('Key-value pairs merged into the intent metadata'),
})

export const PaymentIntentUpdateOutput = PaymentIntentSchema

export const paymentIntentUpdate = pikkuSessionlessFunc({
  description: 'Update a payment intent before it is confirmed: payment method, allowed method types and per-method options, amount, description or metadata',
  node: { displayName: 'Update Payment Intent', category: 'Payment Intents', type: 'action' },
  input: PaymentIntentUpdateInput,
  output: PaymentIntentUpdateOutput,
  func: async ({ stripe }, { paymentIntentId, ...data }) => {
    const result = await stripe.paymentIntents.update(paymentIntentId, toStripeParams(data))
    const camel = fromStripeObject(result)
    return PaymentIntentUpdateOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})
