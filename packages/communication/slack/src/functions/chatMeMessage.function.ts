import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChatMeMessageInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `chat:write`"),
  channel: z.string().optional().describe("Channel to send message to. Can be a public channel, private group or IM channel. Can be an encoded ID, or a name."),
  text: z.string().optional().describe("Text of the message to send."),
})

export const ChatMeMessageOutput = z.object({
  channel: z.string().regex(new RegExp("^[CGD][A-Z0-9]{8,}$")).optional(),
  ok: z.literal(true),
  ts: z.string().regex(new RegExp("^\\d{10}\\.\\d{6}$")).optional(),
}).describe("Schema for successful response from chat.meMessage method")

export const chatMeMessage = pikkuSessionlessFunc({
  description: "Share a me message into a channel.",
  input: ChatMeMessageInput,
  output: ChatMeMessageOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/chat.meMessage", data) as any
  },
})
