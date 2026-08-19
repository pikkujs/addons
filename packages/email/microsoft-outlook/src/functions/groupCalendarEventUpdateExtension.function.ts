import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupCalendarEventUpdateExtensionInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  "event-id": z.string().describe("The unique identifier of event"),
  "extension-id": z.string().describe("The unique identifier of extension"),
  body: z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
}),
})

export const GroupCalendarEventUpdateExtensionOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const groupCalendarEventUpdateExtension = pikkuSessionlessFunc({
  input: GroupCalendarEventUpdateExtensionInput,
  output: GroupCalendarEventUpdateExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/groups/{group-id}/calendar/events/{event-id}/extensions/{extension-id}", data) as any
  },
})
