import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserContactFolderDeleteChildFolderInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contactFolder-id": z.string().describe("The unique identifier of contactFolder"),
  "contactFolder-id1": z.string().describe("The unique identifier of contactFolder"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userContactFolderDeleteChildFolder = pikkuSessionlessFunc({
  input: UserContactFolderDeleteChildFolderInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}", data)
  },
})
