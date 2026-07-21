import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupCalendarEventPermanentDeleteInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  "event-id": z.string().describe("The unique identifier of event"),
})

export const groupCalendarEventPermanentDelete = pikkuSessionlessFunc({
  input: GroupCalendarEventPermanentDeleteInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/groups/{group-id}/calendar/events/{event-id}/microsoft.graph.permanentDelete", data)
  },
})
