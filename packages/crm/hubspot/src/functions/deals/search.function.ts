import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const FilterSchema = z.object({
  propertyName: z.string(),
  operator: z.enum(['EQ', 'NEQ', 'LT', 'LTE', 'GT', 'GTE', 'CONTAINS_TOKEN', 'NOT_CONTAINS_TOKEN']),
  value: z.string(),
})

export const DealSearchInput = z.object({
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

export const DealSearchOutput = z.object({
  total: z.number(),
  results: z.array(z.object({
    id: z.string(),
    properties: z.record(z.string(), z.any()),
  })),
  paging: z.object({
    next: z.object({ after: z.string() }).optional(),
  }).optional(),
})

export const dealSearch = pikkuSessionlessFunc({
  description: 'Searches HubSpot deals',
  node: { displayName: 'Search Deals', category: 'Deals', type: 'action' },
  input: DealSearchInput,
  output: DealSearchOutput,
  func: async ({ hubspot }, input) => {
    return hubspot.request<z.infer<typeof DealSearchOutput>>(
      'POST',
      '/crm/v3/objects/deals/search',
      { body: input }
    )
  },
})
