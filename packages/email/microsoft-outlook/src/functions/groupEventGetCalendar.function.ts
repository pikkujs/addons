import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupEventGetCalendarInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  "event-id": z.string().describe("The unique identifier of event"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const GroupEventGetCalendarOutput = z.any()

export const groupEventGetCalendar = pikkuSessionlessFunc({
  description: "The calendar that contains the event. Navigation property. Read-only.",
  input: GroupEventGetCalendarInput,
  output: GroupEventGetCalendarOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/groups/{group-id}/events/{event-id}/calendar", data) as any
  },
})
