import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListGetInput = z.object({
  id: z.string().describe('The ID of the list to retrieve'),
  contact_sample: z.boolean().optional().describe('Whether to include a sample of contacts'),
})

export const ListGetOutput = z.object({
  id: z.string().describe('The unique ID of the list'),
  name: z.string().describe('The name of the list'),
  contact_count: z.number().describe('The number of contacts in the list'),
  _metadata: z.object({
    self: z.string().describe('Link to the list'),
  }).optional().describe('Metadata about the list'),
})

type Output = z.infer<typeof ListGetOutput>

export const listGet = pikkuSessionlessFunc({
  description: 'Retrieves a marketing list by ID',
  node: { displayName: 'Get List', category: 'Lists', type: 'action' },
  input: ListGetInput,
  output: ListGetOutput,
  func: async ({ sendgrid }, { id, contact_sample }) => {
    return await sendgrid.request<Output>('GET', `/marketing/lists/${id}`, {
      qs: { contact_sample },
    })
  },
})
