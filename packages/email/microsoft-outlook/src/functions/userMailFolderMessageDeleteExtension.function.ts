import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserMailFolderMessageDeleteExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "message-id": z.string().describe("The unique identifier of message"),
  "extension-id": z.string().describe("The unique identifier of extension"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userMailFolderMessageDeleteExtension = pikkuSessionlessFunc({
  input: UserMailFolderMessageDeleteExtensionInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/extensions/{extension-id}", data)
  },
})
