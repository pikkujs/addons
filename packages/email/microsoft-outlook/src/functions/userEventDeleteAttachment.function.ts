import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserEventDeleteAttachmentInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
  "attachment-id": z.string().describe("The unique identifier of attachment"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userEventDeleteAttachment = pikkuSessionlessFunc({
  input: UserEventDeleteAttachmentInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/events/{event-id}/attachments/{attachment-id}", data)
  },
})
