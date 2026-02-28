import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DealUpdateInput = z.object({
  dealId: z.string(),
  properties: z.record(z.string(), z.string()),
})

export const DealUpdateOutput = z.object({
  id: z.string(),
  properties: z.record(z.string(), z.any()),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const dealUpdate = pikkuSessionlessFunc({
  description: 'Updates a HubSpot deal',
  node: { displayName: 'Update Deal', category: 'Deals', type: 'action' },
  input: DealUpdateInput,
  output: DealUpdateOutput,
  func: async ({ hubspot }, { dealId, properties }) => {
    return hubspot.request<z.infer<typeof DealUpdateOutput>>(
      'PATCH',
      `/crm/v3/objects/deals/${dealId}`,
      { body: { properties } }
    )
  },
})
