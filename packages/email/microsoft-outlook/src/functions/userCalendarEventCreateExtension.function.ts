import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarEventCreateExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
  body: z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
}),
})

export const UserCalendarEventCreateExtensionOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const userCalendarEventCreateExtension = pikkuSessionlessFunc({
  input: UserCalendarEventCreateExtensionInput,
  output: UserCalendarEventCreateExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendar/events/{event-id}/extensions", data) as any
  },
})
