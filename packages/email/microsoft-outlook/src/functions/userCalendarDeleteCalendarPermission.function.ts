import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarDeleteCalendarPermissionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendarPermission-id": z.string().describe("The unique identifier of calendarPermission"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userCalendarDeleteCalendarPermission = pikkuSessionlessFunc({
  description: "Delete calendarPermission.",
  input: UserCalendarDeleteCalendarPermissionInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/calendar/calendarPermissions/{calendarPermission-id}", data)
  },
})
