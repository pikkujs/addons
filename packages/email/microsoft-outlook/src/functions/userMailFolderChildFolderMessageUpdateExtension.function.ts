import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserMailFolderChildFolderMessageUpdateExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "mailFolder-id1": z.string().describe("The unique identifier of mailFolder"),
  "message-id": z.string().describe("The unique identifier of message"),
  "extension-id": z.string().describe("The unique identifier of extension"),
  body: z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
}),
})

export const UserMailFolderChildFolderMessageUpdateExtensionOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const userMailFolderChildFolderMessageUpdateExtension = pikkuSessionlessFunc({
  input: UserMailFolderChildFolderMessageUpdateExtensionInput,
  output: UserMailFolderChildFolderMessageUpdateExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/extensions/{extension-id}", data) as any
  },
})
