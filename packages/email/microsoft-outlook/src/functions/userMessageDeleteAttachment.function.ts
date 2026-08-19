import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserMessageDeleteAttachmentInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "message-id": z.string().describe("The unique identifier of message"),
  "attachment-id": z.string().describe("The unique identifier of attachment"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userMessageDeleteAttachment = pikkuSessionlessFunc({
  input: UserMessageDeleteAttachmentInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/messages/{message-id}/attachments/{attachment-id}", data)
  },
})
