import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupCalendarGetEventInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  "event-id": z.string().describe("The unique identifier of event"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const GroupCalendarGetEventOutput = z.any()

export const groupCalendarGetEvent = pikkuSessionlessFunc({
  description: "The events in the calendar. Navigation property. Read-only.",
  input: GroupCalendarGetEventInput,
  output: GroupCalendarGetEventOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/groups/{group-id}/calendar/events/{event-id}", data) as any
  },
})
