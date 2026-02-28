import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanySearchByDomainInput = z.object({
  domain: z.string(),
  properties: z.array(z.string()).optional(),
  limit: z.number().optional().default(10),
  after: z.string().optional(),
})

export const CompanySearchByDomainOutput = z.object({
  total: z.number(),
  results: z.array(z.object({
    id: z.string(),
    properties: z.record(z.string(), z.any()),
  })),
  paging: z.object({
    next: z.object({ after: z.string() }).optional(),
  }).optional(),
})

export const companySearchByDomain = pikkuSessionlessFunc({
  description: 'Searches HubSpot companies by domain',
  node: { displayName: 'Search Companies by Domain', category: 'Companies', type: 'action' },
  input: CompanySearchByDomainInput,
  output: CompanySearchByDomainOutput,
  func: async ({ hubspot }, { domain, properties, limit, after }) => {
    return hubspot.request<z.infer<typeof CompanySearchByDomainOutput>>(
      'POST',
      '/crm/v3/objects/companies/search',
      {
        body: {
          filterGroups: [{
            filters: [{
              propertyName: 'domain',
              operator: 'EQ',
              value: domain,
            }],
          }],
          properties,
          limit,
          after,
        },
      }
    )
  },
})
