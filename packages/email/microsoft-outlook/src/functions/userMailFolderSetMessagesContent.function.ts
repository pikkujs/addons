import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserMailFolderSetMessagesContentInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "message-id": z.string().describe("The unique identifier of message"),
  body: z.string(),
})

export const userMailFolderSetMessagesContent = pikkuSessionlessFunc({
  description: "The unique identifier for an entity. Read-only.",
  input: UserMailFolderSetMessagesContentInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PUT", "/users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/$value", data)
  },
})
