import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyCreateInput = z.object({
  properties: z.record(z.string(), z.string()),
})

export const CompanyCreateOutput = z.object({
  id: z.string(),
  properties: z.record(z.string(), z.any()),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const companyCreate = pikkuSessionlessFunc({
  description: 'Creates a new HubSpot company',
  node: { displayName: 'Create Company', category: 'Companies', type: 'action' },
  input: CompanyCreateInput,
  output: CompanyCreateOutput,
  func: async ({ hubspot }, { properties }) => {
    return hubspot.request<z.infer<typeof CompanyCreateOutput>>(
      'POST',
      '/crm/v3/objects/companies',
      { body: { properties } }
    )
  },
})
