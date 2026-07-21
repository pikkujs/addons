import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserContactFolderChildFolderContactGetExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contactFolder-id": z.string().describe("The unique identifier of contactFolder"),
  "contactFolder-id1": z.string().describe("The unique identifier of contactFolder"),
  "contact-id": z.string().describe("The unique identifier of contact"),
  "extension-id": z.string().describe("The unique identifier of extension"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserContactFolderChildFolderContactGetExtensionOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const userContactFolderChildFolderContactGetExtension = pikkuSessionlessFunc({
  description: "The collection of open extensions defined for the contact. Read-only. Nullable.",
  input: UserContactFolderChildFolderContactGetExtensionInput,
  output: UserContactFolderChildFolderContactGetExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/{contact-id}/extensions/{extension-id}", data) as any
  },
})
