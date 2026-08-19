import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RedactChatCommentInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const RedactChatCommentOutput = z.object({
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

export const redactChatComment = pikkuSessionlessFunc({
  description: "Permanently removes words or strings from a chat ticket's comment. \n\nWrap `<redact>` tags around the content in the chat comment you want redacted. Example: \n\n```json\n{\n  \"text\": \"My ID number is <redact>847564</redact>!\"\n}\n```\n\nThe characters contained in the tag will be replaced by the ▇ symbol.\n\n**Note**: This does not work on active chats. For chat tickets that predate March 2020, consider using [Redact Ticket Comment In Agent Workspace](#redact-ticket-comment-in-agent-workspace).\n\n#### Allowed For\n\n- Agents\n\n[Agent Workspace](https://support.zendesk.com/hc/en-us/articles/4408821259930) must enabled for the account. Deleting tickets must be enabled for agents.\n\n#### Request Body Properties\n\n| Name                     | Type    | Required | Description                                                                                                                                                                                                                                       |\n| ------------------------ | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| chat_id                  | string  | true     | The `chat_id` in the `ChatStartedEvent` event in the ticket audit. See [Ticket Audits](/api-reference/ticketing/tickets/ticket_audits)                                                                                                            |\n| chat_index               | integer | false    | The `chat_index` in the `ChatMessage` event in the ticket audit. See [Ticket Audits](/api-reference/ticketing/tickets/ticket_audits). Mandatory if `message_id` is not used                                                                       |\n| message_id               | string  | false    | The `message_id` of the `ChatMessage` event in the ticket audit that is part of a `ChatStartedEvent` history. Used when redacting a ChatMessage that is part of a conversation history. Mandatory if `chat_index` is not used                     |\n| text                     | string  | true     | The `message` in the `ChatMessage` event in the ticket audit. See [Ticket Audits](/api-reference/ticketing/tickets/ticket_audits).  Wrap `message` with `<redact>` tags                                                                           |\n\nTo get the required body properties, make a request to the [Ticket Audit](/api-reference/ticketing/tickets/ticket_audits) endpoint. Example response:\n\n```http\nStatus 200 OK\n{\n  \"audits\": [\n    \"events\": [\n      {\n        \"id\": 1932802680168,\n        \"type\": \"ChatStartedEvent\",\n        \"value\": {\n          \"visitor_id\": \"10502823-16EkM3T6VNq7KMd\",\n          \"chat_id\": \"2109.10502823.Sjuj2YrBpXwei\",\n          \"history\": [\n            {\n              \"chat_index\": 0,\n              \"type\": \"ChatMessage\",\n              \"message\": \"My ID number is 847564!\"\n            }\n          ]\n        }\n      }\n    ]\n  ]\n}\n```",
  input: RedactChatCommentInput,
  output: RedactChatCommentOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/chat_redactions/{ticket_id}", data) as any
  },
})
