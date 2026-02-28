import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactUpsertInput = z.object({
  email: z.string().email(),
  properties: z.record(z.string(), z.string()).optional(),
})

export const ContactUpsertOutput = z.object({
  id: z.string(),
  properties: z.record(z.string(), z.any()),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const contactUpsert = pikkuSessionlessFunc({
  description: 'Creates or updates a HubSpot contact by email',
  node: { displayName: 'Upsert Contact', category: 'Contacts', type: 'action' },
  input: ContactUpsertInput,
  output: ContactUpsertOutput,
  func: async ({ hubspot }, { email, properties }) => {
    const allProperties = { ...properties, email }
    return hubspot.request<z.infer<typeof ContactUpsertOutput>>(
      'POST',
      '/crm/v3/objects/contacts',
      {
        body: {
          properties: allProperties,
          idProperty: 'email',
        },
      }
    )
  },
})
