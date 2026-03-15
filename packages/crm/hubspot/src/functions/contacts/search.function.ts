import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilterSchema = z.object({
  propertyName: z.string(),
  operator: z.enum(['EQ', 'NEQ', 'LT', 'LTE', 'GT', 'GTE', 'CONTAINS_TOKEN', 'NOT_CONTAINS_TOKEN']),
  value: z.string(),
})

export const ContactSearchInput = z.object({
  query: z.string().optional(),
  filterGroups: z.array(z.object({
    filters: z.array(FilterSchema),
  })).optional(),
  sorts: z.array(z.object({
    propertyName: z.string(),
    direction: z.enum(['ASCENDING', 'DESCENDING']),
  })).optional(),
  properties: z.array(z.string()).optional(),
  limit: z.number().optional().default(10),
  after: z.string().optional(),
})

export const ContactSearchOutput = z.object({
  total: z.number(),
  results: z.array(z.object({
    id: z.string(),
    properties: z.record(z.string(), z.any()),
  })),
  paging: z.object({
    next: z.object({ after: z.string() }).optional(),
  }).optional(),
})

export const contactSearch = pikkuSessionlessFunc({
  description: 'Searches HubSpot contacts',
  node: { displayName: 'Search Contacts', category: 'Contacts', type: 'action' },
  input: ContactSearchInput,
  output: ContactSearchOutput,
  func: async ({ hubspot }, input) => {
    return hubspot.request<z.infer<typeof ContactSearchOutput>>(
      'POST',
      '/crm/v3/objects/contacts/search',
      { body: input }
    )
  },
})
