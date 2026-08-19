import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupEventSnoozeReminderInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  "event-id": z.string().describe("The unique identifier of event"),
  NewReminderTime: z.object({
  dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
  timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
}).optional(),
})

export const groupEventSnoozeReminder = pikkuSessionlessFunc({
  description: "Postpone a reminder for an event in a user calendar until a new time.",
  input: GroupEventSnoozeReminderInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/groups/{group-id}/events/{event-id}/microsoft.graph.snoozeReminder", data)
  },
})
