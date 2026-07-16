import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarGroupDeleteCalendarInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendarGroup-id": z.string().describe("The unique identifier of calendarGroup"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userCalendarGroupDeleteCalendar = pikkuSessionlessFunc({
  input: UserCalendarGroupDeleteCalendarInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}", data)
  },
})
