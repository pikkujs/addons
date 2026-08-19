import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserContactFolderChildFolderContactCreateExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contactFolder-id": z.string().describe("The unique identifier of contactFolder"),
  "contactFolder-id1": z.string().describe("The unique identifier of contactFolder"),
  "contact-id": z.string().describe("The unique identifier of contact"),
  body: z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
}),
})

export const UserContactFolderChildFolderContactCreateExtensionOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const userContactFolderChildFolderContactCreateExtension = pikkuSessionlessFunc({
  input: UserContactFolderChildFolderContactCreateExtensionInput,
  output: UserContactFolderChildFolderContactCreateExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/contactFolders/{contactFolder-id}/childFolders/{contactFolder-id1}/contacts/{contact-id}/extensions", data) as any
  },
})
