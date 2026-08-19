import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupCalendarCalendarPermissionGetCountInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
})

export const groupCalendarCalendarPermissionGetCount = pikkuSessionlessFunc({
  input: GroupCalendarCalendarPermissionGetCountInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/groups/{group-id}/calendar/calendarPermissions/$count", data)
  },
})
