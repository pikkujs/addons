import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactDeleteInput = z.object({
  contactId: z.string(),
})

export const ContactDeleteOutput = z.object({
  success: z.boolean(),
})

export const contactDelete = pikkuSessionlessFunc({
  description: 'Deletes (archives) a HubSpot contact',
  node: { displayName: 'Delete Contact', category: 'Contacts', type: 'action' },
  input: ContactDeleteInput,
  output: ContactDeleteOutput,
  func: async ({ hubspot }, { contactId }) => {
    await hubspot.request('DELETE', `/crm/v3/objects/contacts/${contactId}`)
    return { success: true }
  },
})
