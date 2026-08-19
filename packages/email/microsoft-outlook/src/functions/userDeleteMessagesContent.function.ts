import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserDeleteMessagesContentInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "message-id": z.string().describe("The unique identifier of message"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userDeleteMessagesContent = pikkuSessionlessFunc({
  description: "The unique identifier for an entity. Read-only.",
  input: UserDeleteMessagesContentInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/messages/{message-id}/$value", data)
  },
})
