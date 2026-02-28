import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyDeleteInput = z.object({
  companyId: z.string(),
})

export const CompanyDeleteOutput = z.object({
  success: z.boolean(),
})

export const companyDelete = pikkuSessionlessFunc({
  description: 'Deletes (archives) a HubSpot company',
  node: { displayName: 'Delete Company', category: 'Companies', type: 'action' },
  input: CompanyDeleteInput,
  output: CompanyDeleteOutput,
  func: async ({ hubspot }, { companyId }) => {
    await hubspot.request('DELETE', `/crm/v3/objects/companies/${companyId}`)
    return { success: true }
  },
})
