import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarEventPermanentDeleteInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
})

export const userCalendarEventPermanentDelete = pikkuSessionlessFunc({
  input: UserCalendarEventPermanentDeleteInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendar/events/{event-id}/microsoft.graph.permanentDelete", data)
  },
})
