import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserContactFolderChildFolderPermanentDeleteInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contactFolder-id": z.string().describe("The unique identifier of contactFolder"),
  "contactFolder-id1": z.string().describe("The unique identifier of contactFolder"),
})

export const userContactFolderChildFolderPermanentDelete = pikkuSessionlessFunc({
  input: UserContactFolderChildFolderPermanentDeleteInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/microsoft.graph.permanentDelete", data)
  },
})
