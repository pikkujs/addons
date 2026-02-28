import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactGetInput = z.object({
  contactId: z.string(),
  properties: z.array(z.string()).optional(),
})

export const ContactGetOutput = z.object({
  id: z.string(),
  properties: z.record(z.string(), z.any()),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const contactGet = pikkuSessionlessFunc({
  description: 'Gets a HubSpot contact by ID',
  node: { displayName: 'Get Contact', category: 'Contacts', type: 'action' },
  input: ContactGetInput,
  output: ContactGetOutput,
  func: async ({ hubspot }, { contactId, properties }) => {
    const qs: Record<string, string | undefined> = {}
    if (properties?.length) {
      qs.properties = properties.join(',')
    }
    return hubspot.request<z.infer<typeof ContactGetOutput>>(
      'GET',
      `/crm/v3/objects/contacts/${contactId}`,
      { qs }
    )
  },
})
