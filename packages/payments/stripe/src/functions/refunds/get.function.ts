import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { RefundSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const RefundGetInput = z.object({
  refundId: z.string().describe('The identifier of the refund to retrieve (re_...)'),
})

export const RefundGetOutput = RefundSchema

export const refundGet = pikkuSessionlessFunc({
  description: 'Retrieve details of a previously created refund',
  node: { displayName: 'Get Refund', category: 'Refunds', type: 'action' },
  input: RefundGetInput,
  output: RefundGetOutput,
  func: async ({ stripe }, { refundId }) => {
    const result = await stripe.refunds.retrieve(refundId)
    const camel = fromStripeObject(result)
    return RefundGetOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})
