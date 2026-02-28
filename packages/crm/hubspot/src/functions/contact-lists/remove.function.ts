import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactListRemoveInput = z.object({
  listId: z.string(),
  contactIds: z.array(z.number()),
})

export const ContactListRemoveOutput = z.object({
  updated: z.array(z.number()),
  discarded: z.array(z.number()),
  invalidVids: z.array(z.number()),
  invalidEmails: z.array(z.string()),
})

export const contactListRemove = pikkuSessionlessFunc({
  description: 'Removes contacts from a HubSpot contact list',
  node: { displayName: 'Remove from Contact List', category: 'Contact Lists', type: 'action' },
  input: ContactListRemoveInput,
  output: ContactListRemoveOutput,
  func: async ({ hubspot }, { listId, contactIds }) => {
    return hubspot.request<z.infer<typeof ContactListRemoveOutput>>(
      'POST',
      `/contacts/v1/lists/${listId}/remove`,
      { body: { vids: contactIds } }
    )
  },
})
