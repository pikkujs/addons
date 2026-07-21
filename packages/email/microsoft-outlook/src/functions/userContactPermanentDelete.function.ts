import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserContactPermanentDeleteInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contact-id": z.string().describe("The unique identifier of contact"),
})

export const userContactPermanentDelete = pikkuSessionlessFunc({
  input: UserContactPermanentDeleteInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/contacts/{contact-id}/microsoft.graph.permanentDelete", data)
  },
})
