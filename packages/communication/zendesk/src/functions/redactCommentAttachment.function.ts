import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RedactCommentAttachmentInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
  comment_id: z.number().int().describe("The ID of the comment. Example: 654321"),
  attachment_id: z.number().int().describe("The ID of the attachment. Example: 498483"),
})

export const RedactCommentAttachmentOutput = z.object({
  attachment: z.object({
    content_type: z.string().optional().describe("The content type of the image. Example value: \"image/png\""),
    content_url: z.string().optional().describe("A full URL where the attachment image file can be downloaded. The file may be hosted externally so take care not to inadvertently send Zendesk authentication credentials. See [Working with url properties](/documentation/api-basics/best-practices/working-with-url-properties/)"),
    deleted: z.boolean().optional().describe("If true, the attachment has been deleted"),
    file_name: z.string().optional().describe("The name of the image file"),
    height: z.number().int().optional().describe("The height of the image file in pixels. If height is unknown, returns null"),
    id: z.number().int().optional().describe("Automatically assigned when created"),
    inline: z.boolean().optional().describe("If true, the attachment is excluded from the attachment list and the attachment's URL\ncan be referenced within the comment of a ticket. Default is false\n"),
    malware_access_override: z.boolean().optional().describe("If true, you can download an attachment flagged as malware. If false, you can't download such an attachment."),
    malware_scan_result: z.string().optional().describe("The result of the malware scan. There is a delay between the time the attachment is uploaded and when the malware scan is completed. Usually the scan is done within a few seconds, but high load conditions can delay the scan results. Possible values: \"malware_found\", \"malware_not_found\", \"failed_to_scan\", \"not_scanned\""),
    mapped_content_url: z.string().optional().describe("The URL the attachment image file has been mapped to"),
    size: z.number().int().optional().describe("The size of the image file in bytes"),
    url: z.string().optional().describe("A URL to access the attachment details"),
    width: z.number().int().optional().describe("The width of the image file in pixels. If width is unknown, returns null"),
    thumbnails: z.array(z.object({
      content_type: z.string().optional().describe("The content type of the image. Example value: \"image/png\""),
      content_url: z.string().optional().describe("A full URL where the attachment image file can be downloaded. The file may be hosted externally so take care not to inadvertently send Zendesk authentication credentials. See [Working with url properties](/documentation/api-basics/best-practices/working-with-url-properties/)"),
      deleted: z.boolean().optional().describe("If true, the attachment has been deleted"),
      file_name: z.string().optional().describe("The name of the image file"),
      height: z.number().int().optional().describe("The height of the image file in pixels. If height is unknown, returns null"),
      id: z.number().int().optional().describe("Automatically assigned when created"),
      inline: z.boolean().optional().describe("If true, the attachment is excluded from the attachment list and the attachment's URL\ncan be referenced within the comment of a ticket. Default is false\n"),
      malware_access_override: z.boolean().optional().describe("If true, you can download an attachment flagged as malware. If false, you can't download such an attachment."),
      malware_scan_result: z.string().optional().describe("The result of the malware scan. There is a delay between the time the attachment is uploaded and when the malware scan is completed. Usually the scan is done within a few seconds, but high load conditions can delay the scan results. Possible values: \"malware_found\", \"malware_not_found\", \"failed_to_scan\", \"not_scanned\""),
      mapped_content_url: z.string().optional().describe("The URL the attachment image file has been mapped to"),
      size: z.number().int().optional().describe("The size of the image file in bytes"),
      url: z.string().optional().describe("A URL to access the attachment details"),
      width: z.number().int().optional().describe("The width of the image file in pixels. If width is unknown, returns null"),
    })).optional().describe("An array of attachment objects. Note that photo thumbnails do not have thumbnails"),
  }).optional().describe("A file represented as an [Attachment](/api-reference/ticketing/tickets/ticket-attachments/) object"),
})

export const redactCommentAttachment = pikkuSessionlessFunc({
  description: "Redaction allows you to permanently remove attachments from an existing comment on a ticket. Once removed from a comment, the attachment is replaced with an empty \"redacted.txt\" file.\n\nThe redaction is permanent. It is not possible to undo redaction or see what was removed. Once a ticket is closed, redacting its attachments is no longer possible.\n\nAlso, if you want to redact an inline attachment, you can use the `include_inline_images` parameter in the [List Comments](/api-reference/ticketing/tickets/ticket_comments/#list-comments) operation to obtain the inline attachment ID, and use it in the request URL.\n\n#### Allowed For\n\n* Admins\n* Agents when [deleting tickets is enabled for agents on professional accounts](https://support.zendesk.com/hc/en-us/articles/4408832689818)\n* Agents assigned to a custom role with permissions to redact ticket content (Enterprise only)",
  input: RedactCommentAttachmentInput,
  output: RedactCommentAttachmentOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/tickets/{ticket_id}/comments/{comment_id}/attachments/{attachment_id}/redact", data) as any
  },
})
