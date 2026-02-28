import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListUpdateInput = z.object({
  id: z.string().describe('The ID of the list to update'),
  name: z.string().describe('The new name for the list'),
})

export const ListUpdateOutput = z.object({
  id: z.string().describe('The unique ID of the list'),
  name: z.string().describe('The updated name of the list'),
  contact_count: z.number().describe('The number of contacts in the list'),
})

type Output = z.infer<typeof ListUpdateOutput>

export const listUpdate = pikkuSessionlessFunc({
  description: 'Updates a marketing list',
  node: { displayName: 'Update List', category: 'Lists', type: 'action' },
  input: ListUpdateInput,
  output: ListUpdateOutput,
  func: async ({ sendgrid }, { id, name }) => {
    return await sendgrid.request<Output>('PATCH', `/marketing/lists/${id}`, {
      body: { name },
    })
  },
})
