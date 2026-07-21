import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserContactFolderPermanentDeleteInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contactFolder-id": z.string().describe("The unique identifier of contactFolder"),
})

export const userContactFolderPermanentDelete = pikkuSessionlessFunc({
  input: UserContactFolderPermanentDeleteInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/contactFolders/{contactFolder-id}/microsoft.graph.permanentDelete", data)
  },
})
