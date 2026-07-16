import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarGroupCalendarEventExtensionGetCountInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendarGroup-id": z.string().describe("The unique identifier of calendarGroup"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "event-id": z.string().describe("The unique identifier of event"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
})

export const userCalendarGroupCalendarEventExtensionGetCount = pikkuSessionlessFunc({
  input: UserCalendarGroupCalendarEventExtensionGetCountInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/extensions/$count", data)
  },
})
