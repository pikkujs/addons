import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserMailFolderMessageUpdateExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "message-id": z.string().describe("The unique identifier of message"),
  "extension-id": z.string().describe("The unique identifier of extension"),
  body: z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
}),
})

export const UserMailFolderMessageUpdateExtensionOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const userMailFolderMessageUpdateExtension = pikkuSessionlessFunc({
  input: UserMailFolderMessageUpdateExtensionInput,
  output: UserMailFolderMessageUpdateExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/extensions/{extension-id}", data) as any
  },
})
