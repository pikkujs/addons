import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserContactFolderContactGetPhotoContentInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contactFolder-id": z.string().describe("The unique identifier of contactFolder"),
  "contact-id": z.string().describe("The unique identifier of contact"),
})

export const userContactFolderContactGetPhotoContent = pikkuSessionlessFunc({
  description: "Optional contact picture. You can get or set a photo for a contact.",
  input: UserContactFolderContactGetPhotoContentInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/photo/$value", data)
  },
})
