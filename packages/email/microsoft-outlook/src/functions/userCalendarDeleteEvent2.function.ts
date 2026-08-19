import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarDeleteEvent2Input = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "event-id": z.string().describe("The unique identifier of event"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userCalendarDeleteEvent2 = pikkuSessionlessFunc({
  input: UserCalendarDeleteEvent2Input,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/calendars/{calendar-id}/events/{event-id}", data)
  },
})
