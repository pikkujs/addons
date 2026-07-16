import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserContactFolderContactExtensionGetCountInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contactFolder-id": z.string().describe("The unique identifier of contactFolder"),
  "contact-id": z.string().describe("The unique identifier of contact"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
})

export const userContactFolderContactExtensionGetCount = pikkuSessionlessFunc({
  input: UserContactFolderContactExtensionGetCountInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/extensions/$count", data)
  },
})
