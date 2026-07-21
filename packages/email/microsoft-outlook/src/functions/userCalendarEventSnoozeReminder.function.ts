import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarEventSnoozeReminderInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
  NewReminderTime: z.object({
  dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
  timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
}).optional(),
})

export const userCalendarEventSnoozeReminder = pikkuSessionlessFunc({
  description: "Postpone a reminder for an event in a user calendar until a new time.",
  input: UserCalendarEventSnoozeReminderInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendar/events/{event-id}/microsoft.graph.snoozeReminder", data)
  },
})
