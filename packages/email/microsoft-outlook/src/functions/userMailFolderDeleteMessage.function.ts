import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserMailFolderDeleteMessageInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "message-id": z.string().describe("The unique identifier of message"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userMailFolderDeleteMessage = pikkuSessionlessFunc({
  input: UserMailFolderDeleteMessageInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}", data)
  },
})
