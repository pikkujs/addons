import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserMailFolderGetMessagesContentInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "message-id": z.string().describe("The unique identifier of message"),
})

export const userMailFolderGetMessagesContent = pikkuSessionlessFunc({
  description: "The unique identifier for an entity. Read-only.",
  input: UserMailFolderGetMessagesContentInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/$value", data)
  },
})
