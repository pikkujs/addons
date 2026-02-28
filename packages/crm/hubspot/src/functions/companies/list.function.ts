import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyListInput = z.object({
  limit: z.number().optional().default(10),
  after: z.string().optional(),
  properties: z.array(z.string()).optional(),
})

export const CompanyListOutput = z.object({
  results: z.array(z.object({
    id: z.string(),
    properties: z.record(z.string(), z.any()),
    createdAt: z.string(),
    updatedAt: z.string(),
  })),
  paging: z.object({
    next: z.object({ after: z.string() }).optional(),
  }).optional(),
})

export const companyList = pikkuSessionlessFunc({
  description: 'Lists all HubSpot companies',
  node: { displayName: 'List Companies', category: 'Companies', type: 'action' },
  input: CompanyListInput,
  output: CompanyListOutput,
  func: async ({ hubspot }, { limit, after, properties }) => {
    const qs: Record<string, string | number | undefined> = { limit }
    if (after) qs.after = after
    if (properties?.length) qs.properties = properties.join(',')

    return hubspot.request<z.infer<typeof CompanyListOutput>>(
      'GET',
      '/crm/v3/objects/companies',
      { qs }
    )
  },
})
