import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyUpdateInput = z.object({
  companyId: z.string(),
  properties: z.record(z.string(), z.string()),
})

export const CompanyUpdateOutput = z.object({
  id: z.string(),
  properties: z.record(z.string(), z.any()),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const companyUpdate = pikkuSessionlessFunc({
  description: 'Updates a HubSpot company',
  node: { displayName: 'Update Company', category: 'Companies', type: 'action' },
  input: CompanyUpdateInput,
  output: CompanyUpdateOutput,
  func: async ({ hubspot }, { companyId, properties }) => {
    return hubspot.request<z.infer<typeof CompanyUpdateOutput>>(
      'PATCH',
      `/crm/v3/objects/companies/${companyId}`,
      { body: { properties } }
    )
  },
})
