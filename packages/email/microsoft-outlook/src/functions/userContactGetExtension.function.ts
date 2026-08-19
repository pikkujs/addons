import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserContactGetExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contact-id": z.string().describe("The unique identifier of contact"),
  "extension-id": z.string().describe("The unique identifier of extension"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserContactGetExtensionOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const userContactGetExtension = pikkuSessionlessFunc({
  description: "The collection of open extensions defined for the contact. Read-only. Nullable.",
  input: UserContactGetExtensionInput,
  output: UserContactGetExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/contacts/{contact-id}/extensions/{extension-id}", data) as any
  },
})
