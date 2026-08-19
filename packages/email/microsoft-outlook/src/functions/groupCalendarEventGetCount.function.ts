import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupCalendarEventGetCountInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
})

export const groupCalendarEventGetCount = pikkuSessionlessFunc({
  input: GroupCalendarEventGetCountInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/groups/{group-id}/calendar/events/$count", data)
  },
})
