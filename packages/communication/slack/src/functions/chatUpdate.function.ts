import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChatUpdateInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `chat:write`"),
  as_user: z.string().optional().describe("Pass true to update the message as the authed user. [Bot users](/bot-users) in this context are considered authed users."),
  attachments: z.string().optional().describe("A JSON-based array of structured attachments, presented as a URL-encoded string. This field is required when not presenting `text`. If you don't include this field, the message's previous `attachments` will be retained. To remove previous `attachments`, include an empty array for this field."),
  blocks: z.string().optional().describe("A JSON-based array of [structured blocks](/block-kit/building), presented as a URL-encoded string. If you don't include this field, the message's previous `blocks` will be retained. To remove previous `blocks`, include an empty array for this field."),
  channel: z.string().describe("Channel containing the message to be updated."),
  link_names: z.string().optional().describe("Find and link channel names and usernames. Defaults to `none`. If you do not specify a value for this field, the original value set for the message will be overwritten with the default, `none`."),
  parse: z.string().optional().describe("Change how messages are treated. Defaults to `client`, unlike `chat.postMessage`. Accepts either `none` or `full`. If you do not specify a value for this field, the original value set for the message will be overwritten with the default, `client`."),
  text: z.string().optional().describe("New text for the message, using the [default formatting rules](/reference/surfaces/formatting). It's not required when presenting `blocks` or `attachments`."),
  ts: z.string().describe("Timestamp of the message to be updated."),
})

export const ChatUpdateOutput = z.object({
  channel: z.string(),
  message: z.object({
    attachments: z.array(z.record(z.string(), z.unknown())).optional(),
    blocks: z.record(z.string(), z.unknown()).optional(),
    text: z.string(),
  }),
  ok: z.literal(true),
  text: z.string(),
  ts: z.string(),
}).describe("Schema for successful response of chat.update method")

export const chatUpdate = pikkuSessionlessFunc({
  description: "Updates a message.",
  input: ChatUpdateInput,
  output: ChatUpdateOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/chat.update", data) as any
  },
})
