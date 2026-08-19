import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGetMessagesContentInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "message-id": z.string().describe("The unique identifier of message"),
})

export const userGetMessagesContent = pikkuSessionlessFunc({
  description: "The unique identifier for an entity. Read-only.",
  input: UserGetMessagesContentInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/messages/{message-id}/$value", data)
  },
})
