import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarEventExtensionGetCountInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
})

export const userCalendarEventExtensionGetCount = pikkuSessionlessFunc({
  input: UserCalendarEventExtensionGetCountInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendar/events/{event-id}/extensions/$count", data)
  },
})
