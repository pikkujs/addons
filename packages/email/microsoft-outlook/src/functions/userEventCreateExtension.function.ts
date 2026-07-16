import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserEventCreateExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
  body: z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
}),
})

export const UserEventCreateExtensionOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const userEventCreateExtension = pikkuSessionlessFunc({
  input: UserEventCreateExtensionInput,
  output: UserEventCreateExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/events/{event-id}/extensions", data) as any
  },
})
