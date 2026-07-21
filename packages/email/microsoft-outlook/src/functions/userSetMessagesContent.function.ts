import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserSetMessagesContentInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "message-id": z.string().describe("The unique identifier of message"),
  body: z.string(),
})

export const userSetMessagesContent = pikkuSessionlessFunc({
  description: "The unique identifier for an entity. Read-only.",
  input: UserSetMessagesContentInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PUT", "/users/{user-id}/messages/{message-id}/$value", data)
  },
})
