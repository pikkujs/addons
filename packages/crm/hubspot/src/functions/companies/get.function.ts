import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyGetInput = z.object({
  companyId: z.string(),
  properties: z.array(z.string()).optional(),
})

export const CompanyGetOutput = z.object({
  id: z.string(),
  properties: z.record(z.string(), z.any()),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const companyGet = pikkuSessionlessFunc({
  description: 'Gets a HubSpot company by ID',
  node: { displayName: 'Get Company', category: 'Companies', type: 'action' },
  input: CompanyGetInput,
  output: CompanyGetOutput,
  func: async ({ hubspot }, { companyId, properties }) => {
    const qs: Record<string, string | undefined> = {}
    if (properties?.length) {
      qs.properties = properties.join(',')
    }
    return hubspot.request<z.infer<typeof CompanyGetOutput>>(
      'GET',
      `/crm/v3/objects/companies/${companyId}`,
      { qs }
    )
  },
})
