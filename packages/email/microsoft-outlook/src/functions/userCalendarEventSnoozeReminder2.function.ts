import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarEventSnoozeReminder2Input = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "event-id": z.string().describe("The unique identifier of event"),
  NewReminderTime: z.object({
  dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
  timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
}).optional(),
})

export const userCalendarEventSnoozeReminder2 = pikkuSessionlessFunc({
  description: "Postpone a reminder for an event in a user calendar until a new time.",
  input: UserCalendarEventSnoozeReminder2Input,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.snoozeReminder", data)
  },
})
