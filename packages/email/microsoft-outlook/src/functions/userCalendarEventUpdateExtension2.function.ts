import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarEventUpdateExtension2Input = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "event-id": z.string().describe("The unique identifier of event"),
  "extension-id": z.string().describe("The unique identifier of extension"),
  body: z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
}),
})

export const UserCalendarEventUpdateExtension2Output = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const userCalendarEventUpdateExtension2 = pikkuSessionlessFunc({
  input: UserCalendarEventUpdateExtension2Input,
  output: UserCalendarEventUpdateExtension2Output,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/users/{user-id}/calendars/{calendar-id}/events/{event-id}/extensions/{extension-id}", data) as any
  },
})
