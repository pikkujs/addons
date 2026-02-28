import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DealDeleteInput = z.object({
  dealId: z.string(),
})

export const DealDeleteOutput = z.object({
  success: z.boolean(),
})

export const dealDelete = pikkuSessionlessFunc({
  description: 'Deletes (archives) a HubSpot deal',
  node: { displayName: 'Delete Deal', category: 'Deals', type: 'action' },
  input: DealDeleteInput,
  output: DealDeleteOutput,
  func: async ({ hubspot }, { dealId }) => {
    await hubspot.request('DELETE', `/crm/v3/objects/deals/${dealId}`)
    return { success: true }
  },
})
