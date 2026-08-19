import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RedactChatCommentAttachmentInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const RedactChatCommentAttachmentOutput = z.object({
  chat_event: z.object({
    id: z.number().int().optional().describe("Id assigned to the chat event object"),
    type: z.string().optional().describe("Type of chat event"),
    value: z.object({
      chat_id: z.string().optional().describe("Id of the chat session"),
      history: z.array(z.record(z.string(), z.unknown())).optional().describe("Chat events within the chat session"),
      visitor_id: z.string().optional().describe("Id assigned to the visitor"),
    }).optional().describe("The value of the chat event object"),
  }).optional().describe("Chat event object"),
})

export const redactChatCommentAttachment = pikkuSessionlessFunc({
  description: "Permanently removes one or more chat attachments from a chat ticket.\n\n**Note**: This does not work on active chats. For chat tickets that predate March 2020, consider using [Redact Ticket Comment In Agent Workspace](#redact-ticket-comment-in-agent-workspace).\n\n#### Allowed For\n\n- Agents\n\n[Agent Workspace](https://support.zendesk.com/hc/en-us/articles/4408821259930) must enabled for the account. Deleting tickets must be enabled for agents.\n\n#### Request Body Properties\n\n| Name         | Type    | Required | Description                                                                                                                                                                                                                                            |\n| ------------ | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |\n| chat_id      | string  | true     | The `chat_id` in the `ChatStartedEvent` event in the ticket audit. See [Ticket Audits](/api-reference/ticketing/tickets/ticket_audits)                                                                                                                 |\n| chat_indexes | array   | false    | The array of `chat_index` in the `ChatFileAttachment` event in the ticket audit. See [Ticket Audits](/api-reference/ticketing/tickets/ticket_audits). Mandatory if `message_ids` is not used                                                           |\n| message_ids  | array   | false    | The array of `message_id` in the `ChatFileAttachment` event in the ticket audit that is part of a `ChatStartedEvent` history. Used when redacting a ChatFileAttachment that is part of a conversation history. Mandatory if `chat_indexes` is not used |\n\nTo get the required body properties, make a request to the [Ticket Audits](/api-reference/ticketing/tickets/ticket_audits) endpoint. Example response:\n\n```http\nStatus 200 OK\n{\n  \"audits\": [\n    \"events\": [\n      {\n        \"id\": 1932802680168,\n        \"type\": \"ChatStartedEvent\",\n        \"value\": {\n          \"visitor_id\": \"10502823-16EkM3T6VNq7KMd\",\n          \"chat_id\": \"2109.10502823.Sjuj2YrBpXwei\",\n          \"history\": [\n            {\n              \"chat_index\": 0,\n              \"type\": \"ChatFileAttachment\",\n              \"filename\": \"image1.jpg\"\n            },\n            {\n              \"chat_index\": 1,\n              \"type\": \"ChatFileAttachment\",\n              \"filename\": \"image2.jpg\"\n            }\n          ]\n        }\n      }\n    ]\n  ]\n}\n```",
  input: RedactChatCommentAttachmentInput,
  output: RedactChatCommentAttachmentOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/chat_file_redactions/{ticket_id}", data) as any
  },
})
