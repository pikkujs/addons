import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DealGetInput = z.object({
  dealId: z.string(),
  properties: z.array(z.string()).optional(),
})

export const DealGetOutput = z.object({
  id: z.string(),
  properties: z.record(z.string(), z.any()),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const dealGet = pikkuSessionlessFunc({
  description: 'Gets a HubSpot deal by ID',
  node: { displayName: 'Get Deal', category: 'Deals', type: 'action' },
  input: DealGetInput,
  output: DealGetOutput,
  func: async ({ hubspot }, { dealId, properties }) => {
    const qs: Record<string, string | undefined> = {}
    if (properties?.length) {
      qs.properties = properties.join(',')
    }
    return hubspot.request<z.infer<typeof DealGetOutput>>(
      'GET',
      `/crm/v3/objects/deals/${dealId}`,
      { qs }
    )
  },
})
