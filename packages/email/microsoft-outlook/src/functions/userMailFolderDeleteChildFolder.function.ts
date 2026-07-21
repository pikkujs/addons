import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserMailFolderDeleteChildFolderInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "mailFolder-id1": z.string().describe("The unique identifier of mailFolder"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userMailFolderDeleteChildFolder = pikkuSessionlessFunc({
  input: UserMailFolderDeleteChildFolderInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}", data)
  },
})
