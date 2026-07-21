import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserMailFolderMessageCreateExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "message-id": z.string().describe("The unique identifier of message"),
  body: z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
}),
})

export const UserMailFolderMessageCreateExtensionOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const userMailFolderMessageCreateExtension = pikkuSessionlessFunc({
  input: UserMailFolderMessageCreateExtensionInput,
  output: UserMailFolderMessageCreateExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/extensions", data) as any
  },
})
