import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarEventGetCalendar2Input = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "event-id": z.string().describe("The unique identifier of event"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserCalendarEventGetCalendar2Output = z.any()

export const userCalendarEventGetCalendar2 = pikkuSessionlessFunc({
  description: "The calendar that contains the event. Navigation property. Read-only.",
  input: UserCalendarEventGetCalendar2Input,
  output: UserCalendarEventGetCalendar2Output,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendars/{calendar-id}/events/{event-id}/calendar", data) as any
  },
})
