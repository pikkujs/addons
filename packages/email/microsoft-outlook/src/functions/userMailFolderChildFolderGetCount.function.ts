import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserMailFolderChildFolderGetCountInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
})

export const userMailFolderChildFolderGetCount = pikkuSessionlessFunc({
  input: UserMailFolderChildFolderGetCountInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/mailFolders/{mailFolder-id}/childFolders/$count", data)
  },
})
