import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupCalendarEventAcceptInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  "event-id": z.string().describe("The unique identifier of event"),
  SendResponse: z.boolean().nullable().optional().default(false),
  Comment: z.string().nullable().optional(),
})

export const groupCalendarEventAccept = pikkuSessionlessFunc({
  description: "Accept the specified event in a user calendar.",
  input: GroupCalendarEventAcceptInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/groups/{group-id}/calendar/events/{event-id}/microsoft.graph.accept", data)
  },
})
