import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserMailFolderMessageDeleteAttachmentInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "message-id": z.string().describe("The unique identifier of message"),
  "attachment-id": z.string().describe("The unique identifier of attachment"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userMailFolderMessageDeleteAttachment = pikkuSessionlessFunc({
  input: UserMailFolderMessageDeleteAttachmentInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/attachments/{attachment-id}", data)
  },
})
