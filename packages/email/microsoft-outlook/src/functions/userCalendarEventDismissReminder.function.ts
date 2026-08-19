import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarEventDismissReminderInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
})

export const userCalendarEventDismissReminder = pikkuSessionlessFunc({
  description: "Dismiss a reminder that has been triggered for an event in a user calendar.",
  input: UserCalendarEventDismissReminderInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendar/events/{event-id}/microsoft.graph.dismissReminder", data)
  },
})
