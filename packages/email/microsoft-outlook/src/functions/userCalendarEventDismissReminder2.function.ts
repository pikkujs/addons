import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarEventDismissReminder2Input = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "event-id": z.string().describe("The unique identifier of event"),
})

export const userCalendarEventDismissReminder2 = pikkuSessionlessFunc({
  description: "Dismiss a reminder that has been triggered for an event in a user calendar.",
  input: UserCalendarEventDismissReminder2Input,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.dismissReminder", data)
  },
})
