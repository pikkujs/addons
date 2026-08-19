import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserContactFolderChildFolderContactGetPhotoContentInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contactFolder-id": z.string().describe("The unique identifier of contactFolder"),
  "contactFolder-id1": z.string().describe("The unique identifier of contactFolder"),
  "contact-id": z.string().describe("The unique identifier of contact"),
})

export const userContactFolderChildFolderContactGetPhotoContent = pikkuSessionlessFunc({
  description: "Optional contact picture. You can get or set a photo for a contact.",
  input: UserContactFolderChildFolderContactGetPhotoContentInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/{contact-id}/photo/$value", data)
  },
})
