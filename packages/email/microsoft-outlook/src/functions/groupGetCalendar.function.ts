import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupGetCalendarInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const GroupGetCalendarOutput = z.any()

export const groupGetCalendar = pikkuSessionlessFunc({
  description: "The group's calendar. Read-only.",
  input: GroupGetCalendarInput,
  output: GroupGetCalendarOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/groups/{group-id}/calendar", data) as any
  },
})
