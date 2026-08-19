import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserContactSetPhotoContentInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contact-id": z.string().describe("The unique identifier of contact"),
  body: z.string(),
})

export const userContactSetPhotoContent = pikkuSessionlessFunc({
  description: "Optional contact picture. You can get or set a photo for a contact.",
  input: UserContactSetPhotoContentInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PUT", "/users/{user-id}/contacts/{contact-id}/photo/$value", data)
  },
})
