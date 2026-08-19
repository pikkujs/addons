import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserMailFolderChildFolderMessageDeleteExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "mailFolder-id1": z.string().describe("The unique identifier of mailFolder"),
  "message-id": z.string().describe("The unique identifier of message"),
  "extension-id": z.string().describe("The unique identifier of extension"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userMailFolderChildFolderMessageDeleteExtension = pikkuSessionlessFunc({
  input: UserMailFolderChildFolderMessageDeleteExtensionInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/extensions/{extension-id}", data)
  },
})
