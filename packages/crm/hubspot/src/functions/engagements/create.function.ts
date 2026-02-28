import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EngagementCreateInput = z.object({
  type: z.enum(['CALL', 'EMAIL', 'MEETING', 'TASK']),
  metadata: z.record(z.string(), z.any()),
  associations: z.object({
    contactIds: z.array(z.number()).optional(),
    companyIds: z.array(z.number()).optional(),
    dealIds: z.array(z.number()).optional(),
    ticketIds: z.array(z.number()).optional(),
  }).optional(),
  timestamp: z.number().optional(),
})

export const EngagementCreateOutput = z.object({
  engagement: z.object({
    id: z.number(),
    type: z.string(),
    timestamp: z.number().optional(),
  }),
  metadata: z.record(z.string(), z.any()),
})

export const engagementCreate = pikkuSessionlessFunc({
  description: 'Creates a HubSpot engagement (call, email, meeting, or task)',
  node: { displayName: 'Create Engagement', category: 'Engagements', type: 'action' },
  input: EngagementCreateInput,
  output: EngagementCreateOutput,
  func: async ({ hubspot }, { type, metadata, associations, timestamp }) => {
    return hubspot.request<z.infer<typeof EngagementCreateOutput>>(
      'POST',
      '/engagements/v1/engagements',
      {
        body: {
          engagement: {
            type,
            timestamp: timestamp ?? Date.now(),
          },
          associations: {
            contactIds: associations?.contactIds ?? [],
            companyIds: associations?.companyIds ?? [],
            dealIds: associations?.dealIds ?? [],
            ticketIds: associations?.ticketIds ?? [],
          },
          metadata,
        },
      }
    )
  },
})
