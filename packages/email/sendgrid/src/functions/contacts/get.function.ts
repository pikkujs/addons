import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactGetInput = z.object({
  id: z.string().describe('The ID of the contact to retrieve'),
})

export const ContactGetOutput = z.object({
  id: z.string().describe('The unique ID of the contact'),
  email: z.string().describe('The contact email address'),
  first_name: z.string().optional().describe('First name of the contact'),
  last_name: z.string().optional().describe('Last name of the contact'),
  address_line_1: z.string().optional().describe('First line of the address'),
  address_line_2: z.string().optional().describe('Second line of the address'),
  city: z.string().optional().describe('City of the contact'),
  state_province_region: z.string().optional().describe('State, province, or region'),
  postal_code: z.string().optional().describe('Postal code'),
  country: z.string().optional().describe('Country of the contact'),
  alternate_emails: z.array(z.string()).optional().describe('Alternate email addresses'),
  custom_fields: z.record(z.string(), z.any()).optional().describe('Custom field values'),
  list_ids: z.array(z.string()).optional().describe('IDs of lists the contact belongs to'),
  created_at: z.string().optional().describe('When the contact was created'),
  updated_at: z.string().optional().describe('When the contact was last updated'),
})

type Output = z.infer<typeof ContactGetOutput>

export const contactGet = pikkuSessionlessFunc({
  description: 'Retrieves a contact by ID',
  node: { displayName: 'Get Contact', category: 'Contacts', type: 'action' },
  input: ContactGetInput,
  output: ContactGetOutput,
  func: async ({ sendgrid }, { id }) => {
    return await sendgrid.request<Output>('GET', `/marketing/contacts/${id}`)
  },
})
