import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CustomerCardRemoveInput = z.object({
  customerId: z.string().describe('The ID of the customer whose card to remove'),
  cardId: z.string().describe('The ID of the card to remove'),
})

export const CustomerCardRemoveOutput = z.object({
  id: z.string().describe('Unique identifier for the removed card'),
  object: z.string().describe('String representing the object\'s type'),
  deleted: z.boolean().optional().describe('Whether the card was deleted'),
})

type Output = z.infer<typeof CustomerCardRemoveOutput>

export const customerCardRemove = pikkuSessionlessFunc({
  description: 'Remove a card from a customer',
  node: { displayName: 'Remove Customer Card', category: 'Customer Cards', type: 'action' },
  input: CustomerCardRemoveInput,
  output: CustomerCardRemoveOutput,
  func: async ({ stripe }, { customerId, cardId }) => {
    return await stripe.customers.deleteSource(customerId, cardId) as Output
  },
})
