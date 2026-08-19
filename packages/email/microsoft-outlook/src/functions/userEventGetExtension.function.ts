import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserEventGetExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
  "extension-id": z.string().describe("The unique identifier of extension"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserEventGetExtensionOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const userEventGetExtension = pikkuSessionlessFunc({
  description: "The collection of open extensions defined for the event. Nullable.",
  input: UserEventGetExtensionInput,
  output: UserEventGetExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/events/{event-id}/extensions/{extension-id}", data) as any
  },
})
