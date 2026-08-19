import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarDeleteCalendarPermission2Input = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "calendarPermission-id": z.string().describe("The unique identifier of calendarPermission"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userCalendarDeleteCalendarPermission2 = pikkuSessionlessFunc({
  input: UserCalendarDeleteCalendarPermission2Input,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}", data)
  },
})
