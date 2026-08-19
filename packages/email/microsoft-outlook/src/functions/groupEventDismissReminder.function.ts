import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupEventDismissReminderInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  "event-id": z.string().describe("The unique identifier of event"),
})

export const groupEventDismissReminder = pikkuSessionlessFunc({
  description: "Dismiss a reminder that has been triggered for an event in a user calendar.",
  input: GroupEventDismissReminderInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/groups/{group-id}/events/{event-id}/microsoft.graph.dismissReminder", data)
  },
})
