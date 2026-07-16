import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarEventDeleteAttachmentInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
  "attachment-id": z.string().describe("The unique identifier of attachment"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userCalendarEventDeleteAttachment = pikkuSessionlessFunc({
  input: UserCalendarEventDeleteAttachmentInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/calendar/events/{event-id}/attachments/{attachment-id}", data)
  },
})
