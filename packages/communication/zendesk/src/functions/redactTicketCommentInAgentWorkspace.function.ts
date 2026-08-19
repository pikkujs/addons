import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RedactTicketCommentInAgentWorkspaceInput = z.object({
  ticket_comment_id: z.number().int().describe("The ID of the ticket comment. Example: 35436"),
})

export const RedactTicketCommentInAgentWorkspaceOutput = z.object({
  comment: z.object({
    add_short_url: z.boolean().optional().describe("Internal flag for adding short URLs to the comment"),
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
    })).optional().describe("Attachments, if any. See [Attachment](/api-reference/ticketing/tickets/ticket-attachments/)"),
    audit_id: z.number().int().optional().describe("The id of the ticket audit record. See [Show Audit](/api-reference/ticketing/tickets/ticket_audits/#show-audit)"),
    author_id: z.number().int().nullable().optional().describe("The id of the comment author. If null or omitted on create, defaults to the authenticated user. See [Author id](#author-id)"),
    body: z.string().optional().describe("The comment string. See [Bodies](#bodies)"),
    channel_back: z.string().optional().describe("Internal channel back identifier for the comment"),
    channel_source_id: z.string().nullable().optional().describe("Internal channel source identifier for the comment"),
    created_at: z.string().datetime().optional().describe("The time the comment was created"),
    html_body: z.string().optional().describe("The comment formatted as HTML. See [Bodies](#bodies)"),
    id: z.number().int().optional().describe("Automatically assigned when the comment is created"),
    metadata: z.record(z.string(), z.unknown()).optional().describe("System information (web client, IP address, etc.) and comment flags, if any. See [Comment flags](#comment-flags)"),
    plain_body: z.string().optional().describe("The comment presented as plain text. See [Bodies](#bodies)"),
    public: z.boolean().optional().describe("true if a public comment; false if an internal note. The initial value set on ticket creation persists for any additional comment unless you change it"),
    translate_to: z.string().nullable().optional().describe("The locale code to translate the comment body to."),
    type: z.string().optional().describe("`Comment` or `VoiceComment`. The JSON object for adding voice comments to tickets is different. See [Adding voice comments to tickets](/documentation/ticketing/managing-tickets/adding-voice-comments-to-tickets)"),
    uploads: z.array(z.string()).optional().describe("List of tokens received from [uploading files](/api-reference/ticketing/tickets/ticket-attachments/#upload-files) for comment attachments. The files are attached by creating or updating tickets with the tokens. See [Attaching files](/api-reference/ticketing/tickets/tickets/#attaching-files) in Tickets"),
    via: z.object({
      channel: z.string().optional().describe("This tells you how the ticket or event was created. Examples: \"web\", \"mobile\", \"rule\", \"system\""),
      source: z.record(z.string(), z.unknown()).optional().describe("For some channels a source object gives more information about how or why the ticket or event was created"),
    }).optional().describe("Describes how the object was created. See the [Via object reference](/documentation/ticketing/reference-guides/via-object-reference)"),
  }).optional(),
})

export const redactTicketCommentInAgentWorkspace = pikkuSessionlessFunc({
  description: "Redaction allows you to permanently remove words, strings, or attachments from a ticket comment.\n\nIn the `html_body` of the comment, wrap the content you want redacted in `<redact>` tags. Example:\n\n```json\n{\n  \"html_body\": \"<div class=\\\"zd-comment\\\" dir=\\\"auto\\\">My ID number is <redact>847564</redact>!</div>\",\n  \"ticket_id\":100\n}\n```\n\nThe characters in the redact tag will be replaced by the ▇ symbol.\n\nTo redact HTML elements such inline images, anchor tags, and links, add the `redact` tag attribute to the element as well as the `<redact>` tag to inner text, if any. Example: \n\n`<a href=\"http://example.com\" redact><redact>some link</redact></a>`\n\nThe `redact` attribute only redacts the tag. Any inner text will be left behind if not enclosed in a `<redact>` tag.\n\nRedaction is permanent and can not be undone. Data is permanently deleted from Zendesk servers with no way to recover it.\n\nThis endpoint provides all the same functionality that the [Redact String in Comment](/api-reference/ticketing/tickets/ticket_comments/#redact-string-in-comment) endpoint provides, plus:\n\n- Redaction of comments in closed tickets\n\n- Redaction of comments in archived tickets\n\n- Redaction of formatted text (bold, italics, hyperlinks)\n\n**Limitations**: When content is redacted from an email comment, the content is also redacted from the original email through a background job. It may take a while for the changes to be completed.\n\n**Note**: We recommend using this endpoint instead of the [Redact String in Comment](/api-reference/ticketing/tickets/ticket_comments/#redact-string-in-comment) endpoint, which will eventually be deprecated.\n\n#### Allowed For\n\n- Agents\n\n[Agent Workspace](https://support.zendesk.com/hc/en-us/articles/4408821259930) must be enabled on the account. For professional accounts, deleting tickets must be enabled for agents. On Enterprise accounts, you can assign agents to a custom role with permissions to redact ticket content.\n\n#### Request Body Properties\n\n| Name                     | Type    | Required | Description                                                                                                                                      |\n| -------------------------| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |\n| ticket_id                | integer | true     | The ID of the ticket                                                                                                                             |\n| html_body                | string  | false    | The `html_body` of the comment containing `<redact>` tags or `redact` attributes                                           |\n| external_attachment_urls | array   | false    | Array of attachment URLs belonging to the comment to be redacted. See [`content_url` property of Attachment](/api-reference/ticketing/tickets/ticket-attachments/) |",
  input: RedactTicketCommentInAgentWorkspaceInput,
  output: RedactTicketCommentInAgentWorkspaceOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/comment_redactions/{ticket_comment_id}", data) as any
  },
})
