import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarEventPermanentDelete2Input = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "event-id": z.string().describe("The unique identifier of event"),
})

export const userCalendarEventPermanentDelete2 = pikkuSessionlessFunc({
  input: UserCalendarEventPermanentDelete2Input,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.permanentDelete", data)
  },
})
