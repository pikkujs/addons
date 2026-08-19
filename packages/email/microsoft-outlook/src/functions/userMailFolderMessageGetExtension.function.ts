import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserMailFolderMessageGetExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "message-id": z.string().describe("The unique identifier of message"),
  "extension-id": z.string().describe("The unique identifier of extension"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserMailFolderMessageGetExtensionOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const userMailFolderMessageGetExtension = pikkuSessionlessFunc({
  description: "The collection of open extensions defined for the message. Nullable.",
  input: UserMailFolderMessageGetExtensionInput,
  output: UserMailFolderMessageGetExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/extensions/{extension-id}", data) as any
  },
})
