import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactDeleteInput = z.object({
  ids: z.string().describe('Comma-separated list of contact IDs to delete'),
  delete_all_contacts: z.boolean().optional().describe('Set to true to delete all contacts'),
})

export const ContactDeleteOutput = z.object({
  job_id: z.string().describe('The job ID for tracking the delete operation'),
})

type Output = z.infer<typeof ContactDeleteOutput>

export const contactDelete = pikkuSessionlessFunc({
  description: 'Deletes contacts by ID',
  node: { displayName: 'Delete Contacts', category: 'Contacts', type: 'action' },
  input: ContactDeleteInput,
  output: ContactDeleteOutput,
  func: async ({ sendgrid }, { ids, delete_all_contacts }) => {
    return await sendgrid.request<Output>('DELETE', '/marketing/contacts', {
      qs: { ids, delete_all_contacts },
    })
  },
})
