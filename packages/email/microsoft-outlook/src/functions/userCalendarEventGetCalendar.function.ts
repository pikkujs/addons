import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarEventGetCalendarInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserCalendarEventGetCalendarOutput = z.any()

export const userCalendarEventGetCalendar = pikkuSessionlessFunc({
  description: "The calendar that contains the event. Navigation property. Read-only.",
  input: UserCalendarEventGetCalendarInput,
  output: UserCalendarEventGetCalendarOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendar/events/{event-id}/calendar", data) as any
  },
})
