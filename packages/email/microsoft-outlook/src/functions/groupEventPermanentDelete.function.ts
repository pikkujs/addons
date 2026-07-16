import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupEventPermanentDeleteInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  "event-id": z.string().describe("The unique identifier of event"),
})

export const groupEventPermanentDelete = pikkuSessionlessFunc({
  input: GroupEventPermanentDeleteInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/groups/{group-id}/events/{event-id}/microsoft.graph.permanentDelete", data)
  },
})
