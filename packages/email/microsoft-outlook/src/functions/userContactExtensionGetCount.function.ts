import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserContactExtensionGetCountInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contact-id": z.string().describe("The unique identifier of contact"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
})

export const userContactExtensionGetCount = pikkuSessionlessFunc({
  input: UserContactExtensionGetCountInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/contacts/{contact-id}/extensions/$count", data)
  },
})
