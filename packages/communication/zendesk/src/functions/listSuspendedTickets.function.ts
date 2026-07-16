import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListSuspendedTicketsInput = z.object({
  sort_by: z.string().optional().describe("The field to sort the suspended tickets by. One of \"author_email\", \"cause\", \"created_at\", or \"subject\". Example: \"author_email\""),
  sort_order: z.string().optional().describe("The order in which to sort the suspended tickets.  This can take value `asc` or `desc`.. Example: \"asc\""),
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Pagination parameter. Supports both traditional offset and cursor-based pagination:\n\n- Traditional: `?page=2` (integer page number)\n- Cursor: `?page[size]=50&page[after]=cursor` (deepObject with size, after, before)\n\nThese are mutually exclusive - use one format or the other, not both.\n"),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
})

export const ListSuspendedTicketsOutput = z.object({
  suspended_tickets: z.array(z.object({
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
    })).nullable().optional().describe("The attachments, if any associated to this suspended ticket. See [Attachments](/api-reference/ticketing/tickets/ticket-attachments/)"),
    author: z.object({
      email: z.string().optional().describe("The author email"),
      id: z.number().int().optional().describe("The author id"),
      name: z.string().optional().describe("The author name"),
    }).optional().describe("The author id (if available), name and email"),
    brand_id: z.number().int().optional().describe("The id of the brand this ticket is associated with. Only applicable for Enterprise accounts"),
    cause: z.string().optional().describe("Why the ticket was suspended"),
    cause_id: z.number().int().optional().describe("The ID of the cause"),
    content: z.string().optional().describe("The content that was flagged"),
    created_at: z.string().datetime().optional().describe("The ticket ID this suspended email is associated with, if available"),
    error_messages: z.array(z.record(z.string(), z.unknown())).nullable().optional().describe("The error messages if any associated to this suspended ticket"),
    id: z.number().int().optional().describe("Automatically assigned"),
    message_id: z.string().optional().describe("The ID of the email, if available"),
    recipient: z.string().optional().describe("The original recipient e-mail address of the ticket"),
    subject: z.string().optional().describe("The value of the subject field for this ticket"),
    ticket_id: z.number().int().optional().describe("The ticket ID this suspended email is associated with, if available"),
    updated_at: z.string().datetime().optional().describe("When the ticket was assigned"),
    url: z.string().optional().describe("The API url of this ticket"),
    via: z.object({
      channel: z.union([z.string(), z.number().int()]).optional().describe("This tells you how the ticket or event was created. Examples: \"web\", \"mobile\", \"rule\", \"system\".\nMay be a string name or an integer channel ID.\n"),
      source: z.object({
        from: z.object({
          address: z.string().nullable().optional(),
          id: z.number().int().nullable().optional(),
          name: z.string().nullable().optional(),
          title: z.string().nullable().optional(),
        }).optional(),
        rel: z.string().nullable().optional(),
        to: z.object({
          address: z.string().optional(),
          name: z.string().optional(),
        }).optional(),
      }).optional().describe("For some channels a source object gives more information about how or why the ticket or event was created\n"),
    }).optional().describe("An object explaining how the ticket was created. See the [Via object reference](/documentation/ticketing/reference-guides/via-object-reference)\n"),
  })).optional(),
})

export const listSuspendedTickets = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins and [agents in custom roles with permission](https://support.zendesk.com/hc/en-us/articles/4408882153882#topic_cxn_hig_bd) to manage suspended tickets on Enterprise plans\n* Unrestricted agents on all other plans\n\n#### Sorting\n\nYou can sort the tickets with the `sort_by` and `sort_order` query string parameters.\n\n#### Pagination\n\n* Cursor pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).",
  input: ListSuspendedTicketsInput,
  output: ListSuspendedTicketsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/suspended_tickets", data) as any
  },
})
