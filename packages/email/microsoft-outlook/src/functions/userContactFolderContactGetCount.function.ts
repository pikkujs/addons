import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserContactFolderContactGetCountInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contactFolder-id": z.string().describe("The unique identifier of contactFolder"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
})

export const userContactFolderContactGetCount = pikkuSessionlessFunc({
  input: UserContactFolderContactGetCountInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/contactFolders/{contactFolder-id}/contacts/$count", data)
  },
})
