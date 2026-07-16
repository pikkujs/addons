import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserContactDeleteExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contact-id": z.string().describe("The unique identifier of contact"),
  "extension-id": z.string().describe("The unique identifier of extension"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userContactDeleteExtension = pikkuSessionlessFunc({
  input: UserContactDeleteExtensionInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/contacts/{contact-id}/extensions/{extension-id}", data)
  },
})
