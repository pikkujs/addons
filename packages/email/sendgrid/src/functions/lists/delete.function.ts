import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListDeleteInput = z.object({
  id: z.string().describe('The ID of the list to delete'),
  delete_contacts: z.boolean().optional().describe('Whether to also delete contacts in this list'),
})

export const ListDeleteOutput = z.object({
  success: z.boolean().describe('Whether the list was deleted'),
})

type Output = z.infer<typeof ListDeleteOutput>

export const listDelete = pikkuSessionlessFunc({
  description: 'Deletes a marketing list',
  node: { displayName: 'Delete List', category: 'Lists', type: 'action' },
  input: ListDeleteInput,
  output: ListDeleteOutput,
  func: async ({ sendgrid }, { id, delete_contacts }) => {
    await sendgrid.request('DELETE', `/marketing/lists/${id}`, {
      qs: { delete_contacts },
    })
    return { success: true }
  },
})
