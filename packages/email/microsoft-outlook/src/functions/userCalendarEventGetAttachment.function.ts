import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarEventGetAttachmentInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
  "attachment-id": z.string().describe("The unique identifier of attachment"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserCalendarEventGetAttachmentOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
  contentType: z.string().nullable().optional().describe("The MIME type."),
  isInline: z.boolean().optional().describe("true if the attachment is an inline attachment; otherwise, false."),
  lastModifiedDateTime: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z"),
  name: z.string().nullable().optional().describe("The attachment's file name."),
  size: z.number().min(-2147483648).max(2147483647).optional().describe("The length of the attachment in bytes."),
})

export const userCalendarEventGetAttachment = pikkuSessionlessFunc({
  description: "The collection of FileAttachment, ItemAttachment, and referenceAttachment attachments for the event. Navigation property. Read-only. Nullable.",
  input: UserCalendarEventGetAttachmentInput,
  output: UserCalendarEventGetAttachmentOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendar/events/{event-id}/attachments/{attachment-id}", data) as any
  },
})
