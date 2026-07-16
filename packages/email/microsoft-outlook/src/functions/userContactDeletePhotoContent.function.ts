import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserContactDeletePhotoContentInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contact-id": z.string().describe("The unique identifier of contact"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userContactDeletePhotoContent = pikkuSessionlessFunc({
  description: "Optional contact picture. You can get or set a photo for a contact.",
  input: UserContactDeletePhotoContentInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/contacts/{contact-id}/photo/$value", data)
  },
})
