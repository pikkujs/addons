import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserDeleteMailFolderInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userDeleteMailFolder = pikkuSessionlessFunc({
  input: UserDeleteMailFolderInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/mailFolders/{mailFolder-id}", data)
  },
})
