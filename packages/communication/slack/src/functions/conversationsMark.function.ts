import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ConversationsMarkInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `conversations:write`"),
  channel: z.string().optional().describe("Channel or conversation to set the read cursor for."),
  ts: z.number().optional().describe("Unique identifier of message you want marked as most recently seen in this conversation."),
})

export const ConversationsMarkOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response conversations.mark method")

export const conversationsMark = pikkuSessionlessFunc({
  description: "Sets the read cursor in a channel.",
  input: ConversationsMarkInput,
  output: ConversationsMarkOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/conversations.mark", data) as any
  },
})
