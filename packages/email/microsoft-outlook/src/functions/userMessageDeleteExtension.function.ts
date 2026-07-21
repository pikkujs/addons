import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserMessageDeleteExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "message-id": z.string().describe("The unique identifier of message"),
  "extension-id": z.string().describe("The unique identifier of extension"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userMessageDeleteExtension = pikkuSessionlessFunc({
  input: UserMessageDeleteExtensionInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/messages/{message-id}/extensions/{extension-id}", data)
  },
})
