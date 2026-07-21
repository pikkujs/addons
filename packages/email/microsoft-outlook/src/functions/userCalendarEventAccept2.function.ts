import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarEventAccept2Input = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "event-id": z.string().describe("The unique identifier of event"),
  SendResponse: z.boolean().nullable().optional().default(false),
  Comment: z.string().nullable().optional(),
})

export const userCalendarEventAccept2 = pikkuSessionlessFunc({
  description: "Accept the specified event in a user calendar.",
  input: UserCalendarEventAccept2Input,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.accept", data)
  },
})
