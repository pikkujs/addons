import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ListParamsSchema, RefundSchema, listSchema } from '../../stripe.types.js'
import { toStripeParams, fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const RefundListInput = z.object({
  charge: z.string().optional().describe('Only return refunds for the charge specified by this charge ID'),
  paymentIntent: z.string().optional().describe('Only return refunds for the payment intent specified by this ID'),
  ...ListParamsSchema,
})

export const RefundListOutput = listSchema(RefundSchema)

export const refundList = pikkuSessionlessFunc({
  description: 'Returns a list of refunds you have previously created',
  node: { displayName: 'List Refunds', category: 'Refunds', type: 'action' },
  input: RefundListInput,
  output: RefundListOutput,
  func: async ({ stripe }, data) => {
    const result = await stripe.refunds.list(toStripeParams(data))
    return RefundListOutput.parse({
      object: result.object,
      hasMore: result.has_more,
      url: result.url,
      data: result.data.map((refund) => ({
        ...fromStripeObject(refund),
        created: epochToIso(refund.created),
      })),
    })
  },
})
