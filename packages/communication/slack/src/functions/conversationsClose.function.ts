import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ConversationsCloseInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `conversations:write`"),
  channel: z.string().optional().describe("Conversation to close."),
})

export const ConversationsCloseOutput = z.object({
  already_closed: z.boolean().optional(),
  no_op: z.boolean().optional(),
  ok: z.literal(true),
}).describe("Schema for successful response conversations.close method")

export const conversationsClose = pikkuSessionlessFunc({
  description: "Closes a direct message or multi-person direct message.",
  input: ConversationsCloseInput,
  output: ConversationsCloseOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/conversations.close", data) as any
  },
})
