import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupEventDeleteAttachmentInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  "event-id": z.string().describe("The unique identifier of event"),
  "attachment-id": z.string().describe("The unique identifier of attachment"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const groupEventDeleteAttachment = pikkuSessionlessFunc({
  input: GroupEventDeleteAttachmentInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/groups/{group-id}/events/{event-id}/attachments/{attachment-id}", data)
  },
})
