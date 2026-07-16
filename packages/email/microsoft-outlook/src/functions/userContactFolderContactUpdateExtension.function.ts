import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserContactFolderContactUpdateExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contactFolder-id": z.string().describe("The unique identifier of contactFolder"),
  "contact-id": z.string().describe("The unique identifier of contact"),
  "extension-id": z.string().describe("The unique identifier of extension"),
  body: z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
}),
})

export const UserContactFolderContactUpdateExtensionOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const userContactFolderContactUpdateExtension = pikkuSessionlessFunc({
  input: UserContactFolderContactUpdateExtensionInput,
  output: UserContactFolderContactUpdateExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}/extensions/{extension-id}", data) as any
  },
})
