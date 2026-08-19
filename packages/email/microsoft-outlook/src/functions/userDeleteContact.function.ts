import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserDeleteContactInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contact-id": z.string().describe("The unique identifier of contact"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userDeleteContact = pikkuSessionlessFunc({
  input: UserDeleteContactInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/contacts/{contact-id}", data)
  },
})
