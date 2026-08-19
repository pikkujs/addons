import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserMailFolderMessagePermanentDeleteInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "message-id": z.string().describe("The unique identifier of message"),
})

export const userMailFolderMessagePermanentDelete = pikkuSessionlessFunc({
  input: UserMailFolderMessagePermanentDeleteInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/microsoft.graph.permanentDelete", data)
  },
})
