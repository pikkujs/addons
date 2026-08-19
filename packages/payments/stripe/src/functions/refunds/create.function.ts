import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { MetadataSchema, RefundSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const RefundCreateInput = z.object({
  charge: z.string().optional().describe('ID of the charge to refund. Provide this or paymentIntent'),
  paymentIntent: z.string().optional().describe('ID of the payment intent to refund. Provide this or charge'),
  amount: z.number().optional().describe('Amount, in the smallest currency unit, to refund. Defaults to the entire remaining amount if omitted (full refund)'),
  reason: z.enum(['duplicate', 'fraudulent', 'requested_by_customer']).optional().describe('The reason for the refund'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to the refund'),
  idempotencyKey: z.string().optional().describe('Idempotency key so a retried refund does not double-refund'),
})

export const RefundCreateOutput = RefundSchema

export const refundCreate = pikkuSessionlessFunc({
  description: 'Refund a charge or payment intent, in full or in part. Money flows back to the customer',
  node: { displayName: 'Create Refund', category: 'Refunds', type: 'action' },
  input: RefundCreateInput,
  output: RefundCreateOutput,
  func: async ({ stripe }, data) => {
    const result = await stripe.refunds.create(
      {
        ...(data.charge ? { charge: data.charge } : {}),
        ...(data.paymentIntent ? { payment_intent: data.paymentIntent } : {}),
        ...(data.amount !== undefined ? { amount: data.amount } : {}),
        ...(data.reason ? { reason: data.reason } : {}),
        ...(data.metadata ? { metadata: data.metadata } : {}),
      },
      data.idempotencyKey ? { idempotencyKey: data.idempotencyKey } : undefined,
    )
    const camel = fromStripeObject(result)
    return RefundCreateOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})
