import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarGetCountInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
})

export const userCalendarGetCount = pikkuSessionlessFunc({
  input: UserCalendarGetCountInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendars/$count", data)
  },
})
