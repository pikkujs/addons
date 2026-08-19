import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserEventUpdateExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
  "extension-id": z.string().describe("The unique identifier of extension"),
  body: z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
}),
})

export const UserEventUpdateExtensionOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const userEventUpdateExtension = pikkuSessionlessFunc({
  input: UserEventUpdateExtensionInput,
  output: UserEventUpdateExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/users/{user-id}/events/{event-id}/extensions/{extension-id}", data) as any
  },
})
