import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SourceDeleteInput = z.object({
  customerId: z.string().describe('The ID of the customer the source belongs to'),
  sourceId: z.string().describe('The ID of the source to be detached'),
})

export const SourceDeleteOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.string().describe('String representing the object\'s type'),
  status: z.string().optional().describe('The status of the source'),
})

type Output = z.infer<typeof SourceDeleteOutput>

export const sourceDelete = pikkuSessionlessFunc({
  description: 'Detach a source from a customer, removing it as a payment method',
  node: { displayName: 'Delete Source', category: 'Sources', type: 'action' },
  input: SourceDeleteInput,
  output: SourceDeleteOutput,
  func: async ({ stripe }, { customerId, sourceId }) => {
    return await stripe.customers.deleteSource(customerId, sourceId) as Output
  },
})
