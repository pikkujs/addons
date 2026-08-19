import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserDeleteContactFolderInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contactFolder-id": z.string().describe("The unique identifier of contactFolder"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userDeleteContactFolder = pikkuSessionlessFunc({
  input: UserDeleteContactFolderInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/contactFolders/{contactFolder-id}", data)
  },
})
