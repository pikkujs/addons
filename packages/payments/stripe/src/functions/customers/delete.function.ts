import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CustomerDeleteInput = z.object({
  customerId: z.string().describe('The identifier of the customer to be deleted'),
})

export const CustomerDeleteOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('customer').describe('String representing the object\'s type'),
  deleted: z.literal(true).describe('Always true for a deleted object'),
})

type Output = z.infer<typeof CustomerDeleteOutput>

export const customerDelete = pikkuSessionlessFunc({
  description: 'Permanently deletes a customer. It cannot be undone',
  node: { displayName: 'Delete Customer', category: 'Customers', type: 'action' },
  input: CustomerDeleteInput,
  output: CustomerDeleteOutput,
  func: async ({ stripe }, { customerId }) => {
    return await stripe.customers.del(customerId) as Output
  },
})
