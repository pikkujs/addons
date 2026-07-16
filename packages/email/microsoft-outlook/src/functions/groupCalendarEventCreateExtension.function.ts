import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupCalendarEventCreateExtensionInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  "event-id": z.string().describe("The unique identifier of event"),
  body: z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
}),
})

export const GroupCalendarEventCreateExtensionOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const groupCalendarEventCreateExtension = pikkuSessionlessFunc({
  input: GroupCalendarEventCreateExtensionInput,
  output: GroupCalendarEventCreateExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/groups/{group-id}/calendar/events/{event-id}/extensions", data) as any
  },
})
