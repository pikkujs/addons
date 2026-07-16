import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarGroupCalendarEventPermanentDeleteInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendarGroup-id": z.string().describe("The unique identifier of calendarGroup"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "event-id": z.string().describe("The unique identifier of event"),
})

export const userCalendarGroupCalendarEventPermanentDelete = pikkuSessionlessFunc({
  input: UserCalendarGroupCalendarEventPermanentDeleteInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.permanentDelete", data)
  },
})
