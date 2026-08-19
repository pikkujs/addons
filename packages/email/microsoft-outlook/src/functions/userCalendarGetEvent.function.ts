import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarGetEventInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserCalendarGetEventOutput = z.any()

export const userCalendarGetEvent = pikkuSessionlessFunc({
  description: "The events in the calendar. Navigation property. Read-only.",
  input: UserCalendarGetEventInput,
  output: UserCalendarGetEventOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendar/events/{event-id}", data) as any
  },
})
