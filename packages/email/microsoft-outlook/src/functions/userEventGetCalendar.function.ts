import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserEventGetCalendarInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserEventGetCalendarOutput = z.any()

export const userEventGetCalendar = pikkuSessionlessFunc({
  description: "The calendar that contains the event. Navigation property. Read-only.",
  input: UserEventGetCalendarInput,
  output: UserEventGetCalendarOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/events/{event-id}/calendar", data) as any
  },
})
