import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EngagementDeleteInput = z.object({
  engagementId: z.string(),
})

export const EngagementDeleteOutput = z.object({
  success: z.boolean(),
})

export const engagementDelete = pikkuSessionlessFunc({
  description: 'Deletes a HubSpot engagement',
  node: { displayName: 'Delete Engagement', category: 'Engagements', type: 'action' },
  input: EngagementDeleteInput,
  output: EngagementDeleteOutput,
  func: async ({ hubspot }, { engagementId }) => {
    await hubspot.request('DELETE', `/engagements/v1/engagements/${engagementId}`)
    return { success: true }
  },
})
