import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DealCreateInput = z.object({
  properties: z.record(z.string(), z.string()),
})

export const DealCreateOutput = z.object({
  id: z.string(),
  properties: z.record(z.string(), z.any()),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const dealCreate = pikkuSessionlessFunc({
  description: 'Creates a new HubSpot deal',
  node: { displayName: 'Create Deal', category: 'Deals', type: 'action' },
  input: DealCreateInput,
  output: DealCreateOutput,
  func: async ({ hubspot }, { properties }) => {
    return hubspot.request<z.infer<typeof DealCreateOutput>>(
      'POST',
      '/crm/v3/objects/deals',
      { body: { properties } }
    )
  },
})
