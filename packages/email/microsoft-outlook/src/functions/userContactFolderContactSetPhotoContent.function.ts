import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserContactFolderContactSetPhotoContentInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contactFolder-id": z.string().describe("The unique identifier of contactFolder"),
  "contact-id": z.string().describe("The unique identifier of contact"),
  body: z.string(),
})

export const userContactFolderContactSetPhotoContent = pikkuSessionlessFunc({
  description: "Optional contact picture. You can get or set a photo for a contact.",
  input: UserContactFolderContactSetPhotoContentInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PUT", "/users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/photo/$value", data)
  },
})
