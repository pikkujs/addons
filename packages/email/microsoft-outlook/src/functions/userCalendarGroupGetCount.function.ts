import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarGroupGetCountInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
})

export const userCalendarGroupGetCount = pikkuSessionlessFunc({
  input: UserCalendarGroupGetCountInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendarGroups/$count", data)
  },
})
