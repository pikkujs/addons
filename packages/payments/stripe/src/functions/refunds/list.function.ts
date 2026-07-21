import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ListParamsSchema, RefundSchema, listSchema } from '../../stripe.types.js'

export const RefundListInput = z.object({
  charge: z.string().optional().describe('Only return refunds for the charge specified by this charge ID'),
  payment_intent: z.string().optional().describe('Only return refunds for the payment intent specified by this ID'),
  ...ListParamsSchema,
})

export const RefundListOutput = listSchema(RefundSchema)

type Input = z.infer<typeof RefundListInput>
type Output = z.infer<typeof RefundListOutput>

export const refundList = pikkuSessionlessFunc({
  description: 'Returns a list of refunds you have previously created',
  node: { displayName: 'List Refunds', category: 'Refunds', type: 'action' },
  input: RefundListInput,
  output: RefundListOutput,
  func: async ({ stripe }, data) => {
    return await stripe.refunds.list(data as Input) as unknown as Output
  },
})
