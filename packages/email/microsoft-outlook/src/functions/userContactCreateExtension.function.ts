import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserContactCreateExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contact-id": z.string().describe("The unique identifier of contact"),
  body: z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
}),
})

export const UserContactCreateExtensionOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
})

export const userContactCreateExtension = pikkuSessionlessFunc({
  input: UserContactCreateExtensionInput,
  output: UserContactCreateExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/contacts/{contact-id}/extensions", data) as any
  },
})
