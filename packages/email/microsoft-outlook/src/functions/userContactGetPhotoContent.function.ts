import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserContactGetPhotoContentInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contact-id": z.string().describe("The unique identifier of contact"),
})

export const userContactGetPhotoContent = pikkuSessionlessFunc({
  description: "Optional contact picture. You can get or set a photo for a contact.",
  input: UserContactGetPhotoContentInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/contacts/{contact-id}/photo/$value", data)
  },
})
