import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarGroupCalendarDeleteCalendarPermissionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendarGroup-id": z.string().describe("The unique identifier of calendarGroup"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "calendarPermission-id": z.string().describe("The unique identifier of calendarPermission"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userCalendarGroupCalendarDeleteCalendarPermission = pikkuSessionlessFunc({
  input: UserCalendarGroupCalendarDeleteCalendarPermissionInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}", data)
  },
})
