import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarGroupCalendarEventAcceptInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendarGroup-id": z.string().describe("The unique identifier of calendarGroup"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "event-id": z.string().describe("The unique identifier of event"),
  SendResponse: z.boolean().nullable().optional().default(false),
  Comment: z.string().nullable().optional(),
})

export const userCalendarGroupCalendarEventAccept = pikkuSessionlessFunc({
  description: "Accept the specified event in a user calendar.",
  input: UserCalendarGroupCalendarEventAcceptInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.accept", data)
  },
})
