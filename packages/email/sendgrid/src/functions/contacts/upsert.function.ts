import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactSchema = z.object({
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
})

export const ContactUpsertInput = z.object({
  list_ids: z.array(z.string()).optional().describe('List IDs to add contacts to'),
  contacts: z.array(ContactSchema).describe('Array of contacts to add or update'),
})

export const ContactUpsertOutput = z.object({
  job_id: z.string().describe('The job ID for tracking the upsert operation'),
})

type Input = z.infer<typeof ContactUpsertInput>
type Output = z.infer<typeof ContactUpsertOutput>

export const contactUpsert = pikkuSessionlessFunc({
  description: 'Adds or updates contacts in SendGrid',
  node: { displayName: 'Upsert Contacts', category: 'Contacts', type: 'action' },
  input: ContactUpsertInput,
  output: ContactUpsertOutput,
  func: async ({ sendgrid }, data) => {
    return await sendgrid.request<Output>('PUT', '/marketing/contacts', { body: data as Input })
  },
})
