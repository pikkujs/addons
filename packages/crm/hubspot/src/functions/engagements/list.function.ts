import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EngagementListInput = z.object({
  limit: z.number().optional().default(20),
  offset: z.number().optional(),
})

export const EngagementListOutput = z.object({
  results: z.array(z.object({
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
  })),
  hasMore: z.boolean(),
  offset: z.number(),
})

export const engagementList = pikkuSessionlessFunc({
  description: 'Lists all HubSpot engagements',
  node: { displayName: 'List Engagements', category: 'Engagements', type: 'action' },
  input: EngagementListInput,
  output: EngagementListOutput,
  func: async ({ hubspot }, { limit, offset }) => {
    const qs: Record<string, number | undefined> = { limit }
    if (offset !== undefined) qs.offset = offset

    return hubspot.request<z.infer<typeof EngagementListOutput>>(
      'GET',
      '/engagements/v1/engagements/paged',
      { qs }
    )
  },
})
