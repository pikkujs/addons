import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupCalendarDeleteCalendarPermissionInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  "calendarPermission-id": z.string().describe("The unique identifier of calendarPermission"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const groupCalendarDeleteCalendarPermission = pikkuSessionlessFunc({
  input: GroupCalendarDeleteCalendarPermissionInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/groups/{group-id}/calendar/calendarPermissions/{calendarPermission-id}", data)
  },
})
