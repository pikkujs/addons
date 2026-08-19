import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarEventGetExtension2Input = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "event-id": z.string().describe("The unique identifier of event"),
  "extension-id": z.string().describe("The unique identifier of extension"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserCalendarEventGetExtension2Output = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const userCalendarEventGetExtension2 = pikkuSessionlessFunc({
  description: "The collection of open extensions defined for the event. Nullable.",
  input: UserCalendarEventGetExtension2Input,
  output: UserCalendarEventGetExtension2Output,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendars/{calendar-id}/events/{event-id}/extensions/{extension-id}", data) as any
  },
})
