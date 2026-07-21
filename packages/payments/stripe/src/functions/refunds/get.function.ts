import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { RefundSchema } from '../../stripe.types.js'

export const RefundGetInput = z.object({
  refundId: z.string().describe('The identifier of the refund to retrieve (re_...)'),
})

export const RefundGetOutput = RefundSchema

type Output = z.infer<typeof RefundGetOutput>

export const refundGet = pikkuSessionlessFunc({
  description: 'Retrieve details of a previously created refund',
  node: { displayName: 'Get Refund', category: 'Refunds', type: 'action' },
  input: RefundGetInput,
  output: RefundGetOutput,
  func: async ({ stripe }, { refundId }) => {
    return await stripe.refunds.retrieve(refundId) as unknown as Output
  },
})
