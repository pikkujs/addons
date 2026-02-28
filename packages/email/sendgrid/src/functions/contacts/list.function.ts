import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactListInput = z.object({
  query: z.string().optional().describe('SGQL query to filter contacts (e.g., "email LIKE \'%@example.com\'")'),
})

const ContactSchema = z.object({
  id: z.string().describe('The unique ID of the contact'),
  email: z.string().describe('The contact email address'),
  first_name: z.string().optional().describe('First name of the contact'),
  last_name: z.string().optional().describe('Last name of the contact'),
  list_ids: z.array(z.string()).optional().describe('IDs of lists the contact belongs to'),
})

export const ContactListOutput = z.object({
  result: z.array(ContactSchema).describe('Array of contacts'),
  contact_count: z.number().optional().describe('Total number of contacts'),
})

type Output = z.infer<typeof ContactListOutput>

export const contactList = pikkuSessionlessFunc({
  description: 'Retrieves contacts, optionally filtered by query',
  node: { displayName: 'List Contacts', category: 'Contacts', type: 'action' },
  input: ContactListInput,
  output: ContactListOutput,
  func: async ({ sendgrid }, { query }) => {
    if (query) {
      return await sendgrid.request<Output>('POST', '/marketing/contacts/search', {
        body: { query },
      })
    }
    return await sendgrid.request<Output>('GET', '/marketing/contacts')
  },
})
