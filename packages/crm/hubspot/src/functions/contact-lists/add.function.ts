import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactListAddInput = z.object({
  listId: z.string(),
  contactIds: z.array(z.number()),
})

export const ContactListAddOutput = z.object({
  updated: z.array(z.number()),
  discarded: z.array(z.number()),
  invalidVids: z.array(z.number()),
  invalidEmails: z.array(z.string()),
})

export const contactListAdd = pikkuSessionlessFunc({
  description: 'Adds contacts to a HubSpot contact list',
  node: { displayName: 'Add to Contact List', category: 'Contact Lists', type: 'action' },
  input: ContactListAddInput,
  output: ContactListAddOutput,
  func: async ({ hubspot }, { listId, contactIds }) => {
    return hubspot.request<z.infer<typeof ContactListAddOutput>>(
      'POST',
      `/contacts/v1/lists/${listId}/add`,
      { body: { vids: contactIds } }
    )
  },
})
