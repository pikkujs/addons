import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupCalendarEventDismissReminderInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  "event-id": z.string().describe("The unique identifier of event"),
})

export const groupCalendarEventDismissReminder = pikkuSessionlessFunc({
  description: "Dismiss a reminder that has been triggered for an event in a user calendar.",
  input: GroupCalendarEventDismissReminderInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/groups/{group-id}/calendar/events/{event-id}/microsoft.graph.dismissReminder", data)
  },
})
