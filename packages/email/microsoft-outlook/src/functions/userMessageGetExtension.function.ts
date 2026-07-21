import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserMessageGetExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "message-id": z.string().describe("The unique identifier of message"),
  "extension-id": z.string().describe("The unique identifier of extension"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserMessageGetExtensionOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const userMessageGetExtension = pikkuSessionlessFunc({
  description: "The collection of open extensions defined for the message. Nullable.",
  input: UserMessageGetExtensionInput,
  output: UserMessageGetExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/messages/{message-id}/extensions/{extension-id}", data) as any
  },
})
