import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserContactFolderContactUpdatePhotoInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contactFolder-id": z.string().describe("The unique identifier of contactFolder"),
  "contact-id": z.string().describe("The unique identifier of contact"),
  body: z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
  height: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The height of the photo. Read-only."),
  width: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The width of the photo. Read-only."),
}),
})

export const UserContactFolderContactUpdatePhotoOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
  height: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The height of the photo. Read-only."),
  width: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The width of the photo. Read-only."),
})

export const userContactFolderContactUpdatePhoto = pikkuSessionlessFunc({
  input: UserContactFolderContactUpdatePhotoInput,
  output: UserContactFolderContactUpdatePhotoOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/photo", data) as any
  },
})
