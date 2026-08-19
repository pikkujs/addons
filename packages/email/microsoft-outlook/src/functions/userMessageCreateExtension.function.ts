import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserMessageCreateExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "message-id": z.string().describe("The unique identifier of message"),
  body: z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
}),
})

export const UserMessageCreateExtensionOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const userMessageCreateExtension = pikkuSessionlessFunc({
  input: UserMessageCreateExtensionInput,
  output: UserMessageCreateExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/messages/{message-id}/extensions", data) as any
  },
})
