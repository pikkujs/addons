import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserContactFolderContactGetPhotoInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contactFolder-id": z.string().describe("The unique identifier of contactFolder"),
  "contact-id": z.string().describe("The unique identifier of contact"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserContactFolderContactGetPhotoOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
  height: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The height of the photo. Read-only."),
  width: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The width of the photo. Read-only."),
})

export const userContactFolderContactGetPhoto = pikkuSessionlessFunc({
  description: "Optional contact picture. You can get or set a photo for a contact.",
  input: UserContactFolderContactGetPhotoInput,
  output: UserContactFolderContactGetPhotoOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/photo", data) as any
  },
})
