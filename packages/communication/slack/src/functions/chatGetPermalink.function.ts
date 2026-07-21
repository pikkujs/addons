import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChatGetPermalinkInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `none`"),
  channel: z.string().describe("The ID of the conversation or channel containing the message"),
  message_ts: z.string().describe("A message's `ts` value, uniquely identifying it within a channel"),
})

export const ChatGetPermalinkOutput = z.object({
  channel: z.string().regex(new RegExp("^[CGD][A-Z0-9]{8,}$")),
  ok: z.literal(true),
  permalink: z.string().url(),
}).describe("Schema for successful response chat.getPermalink")

export const chatGetPermalink = pikkuSessionlessFunc({
  description: "Retrieve a permalink URL for a specific extant message",
  input: ChatGetPermalinkInput,
  output: ChatGetPermalinkOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/chat.getPermalink", data) as any
  },
})
