import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserMailFolderChildFolderPermanentDeleteInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "mailFolder-id1": z.string().describe("The unique identifier of mailFolder"),
})

export const userMailFolderChildFolderPermanentDelete = pikkuSessionlessFunc({
  input: UserMailFolderChildFolderPermanentDeleteInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/microsoft.graph.permanentDelete", data)
  },
})
