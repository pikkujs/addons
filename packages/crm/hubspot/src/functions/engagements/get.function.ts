import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EngagementGetInput = z.object({
  engagementId: z.string(),
})

export const EngagementGetOutput = z.object({
  engagement: z.object({
    id: z.number(),
    type: z.string(),
    timestamp: z.number().optional(),
  }),
  associations: z.object({
    contactIds: z.array(z.number()),
    companyIds: z.array(z.number()),
    dealIds: z.array(z.number()),
    ticketIds: z.array(z.number()),
  }),
  metadata: z.record(z.string(), z.any()),
})

export const engagementGet = pikkuSessionlessFunc({
  description: 'Gets a HubSpot engagement by ID',
  node: { displayName: 'Get Engagement', category: 'Engagements', type: 'action' },
  input: EngagementGetInput,
  output: EngagementGetOutput,
  func: async ({ hubspot }, { engagementId }) => {
    return hubspot.request<z.infer<typeof EngagementGetOutput>>(
      'GET',
      `/engagements/v1/engagements/${engagementId}`
    )
  },
})
