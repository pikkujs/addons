import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarGetEvent2Input = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "event-id": z.string().describe("The unique identifier of event"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserCalendarGetEvent2Output = z.any()

export const userCalendarGetEvent2 = pikkuSessionlessFunc({
  description: "The events in the calendar. Navigation property. Read-only.",
  input: UserCalendarGetEvent2Input,
  output: UserCalendarGetEvent2Output,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendars/{calendar-id}/events/{event-id}", data) as any
  },
})
