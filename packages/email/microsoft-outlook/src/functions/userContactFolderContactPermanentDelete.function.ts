import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserContactFolderContactPermanentDeleteInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contactFolder-id": z.string().describe("The unique identifier of contactFolder"),
  "contact-id": z.string().describe("The unique identifier of contact"),
})

export const userContactFolderContactPermanentDelete = pikkuSessionlessFunc({
  input: UserContactFolderContactPermanentDeleteInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/microsoft.graph.permanentDelete", data)
  },
})
