import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListConversationLogForTicketInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
  page: z.object({
  after: z.string().optional().describe("Cursor token for fetching next page"),
  before: z.string().optional().describe("Cursor token for fetching previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
}).optional().describe("Cursor-based pagination parameters (JSON:API style).\n\nSupports nested parameters:\n- `page[size]` - Number of records per page (default varies by endpoint, typically 100)\n- `page[after]` - Cursor token to fetch records after this position\n- `page[before]` - Cursor token to fetch records before this position\n\nExample: `?page[size]=50&page[after]=eyJvIjoiaWQiLCJ2IjoiYVFFPSJ9`\n"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
})

export const ListConversationLogForTicketOutput = z.object({
  events: z.array(z.object({
    attachments: z.array(z.object({
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
    })).describe("A collection of attachments (image or file) associated with the event"),
    author: z.object({
      type: z.enum(["user", "agent", "bot"]).optional().describe("Either user, agent, or bot"),
      "zen:sunco:user_id": z.string().optional().describe("A Zendesk resource name prefix describing a messaging user"),
      "zen:support:user_id": z.number().int().optional().describe("A Zendesk resource name prefix describing a Support user"),
    }).describe("Object that describes the user who created the event"),
    content: z.record(z.string(), z.unknown()).describe("Object that describes the content of the message. The inner fields depends on the record type"),
    created_at: z.string().datetime().describe("The timestamp of when this record was created"),
    id: z.string().describe("Unique record identifier"),
    metadata: z.record(z.string(), z.unknown()).describe("Various additional data that further describes this record"),
    reference: z.string().describe("A Zendesk resource name value that uniquely identifies this record. Example: `zen:ticket_event:<id>`"),
    type: z.string().describe("The type of record, representing one of the conversational ticket events. Examples: `Comment` or `Messaging::ConversationMessage`"),
  })).optional(),
  links: z.object({
    next: z.string().optional(),
    prev: z.string().optional(),
  }).optional(),
  meta: z.object({
    after_cursor: z.string().optional(),
    before_cursor: z.string().optional(),
    has_more: z.boolean().optional(),
  }).optional(),
})

export const listConversationLogForTicket = pikkuSessionlessFunc({
  description: "Lists the conversation log events for a specified ticket.\n\n#### Pagination\n\n- Cursor pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed for\n\n* Agents",
  input: ListConversationLogForTicketInput,
  output: ListConversationLogForTicketOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/tickets/{ticket_id}/conversation_log", data) as any
  },
})
