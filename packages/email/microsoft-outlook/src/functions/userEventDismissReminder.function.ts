import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserEventDismissReminderInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
})

export const userEventDismissReminder = pikkuSessionlessFunc({
  description: "Dismiss a reminder that has been triggered for an event in a user calendar.",
  input: UserEventDismissReminderInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/events/{event-id}/microsoft.graph.dismissReminder", data)
  },
})
