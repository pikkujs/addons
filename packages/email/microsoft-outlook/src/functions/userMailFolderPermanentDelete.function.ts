import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserMailFolderPermanentDeleteInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
})

export const userMailFolderPermanentDelete = pikkuSessionlessFunc({
  input: UserMailFolderPermanentDeleteInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/mailFolders/{mailFolder-id}/microsoft.graph.permanentDelete", data)
  },
})
