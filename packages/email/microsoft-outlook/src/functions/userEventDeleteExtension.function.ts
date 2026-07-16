import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserEventDeleteExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
  "extension-id": z.string().describe("The unique identifier of extension"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userEventDeleteExtension = pikkuSessionlessFunc({
  input: UserEventDeleteExtensionInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/events/{event-id}/extensions/{extension-id}", data)
  },
})
