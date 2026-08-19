import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ConversationsLeaveInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `conversations:write`"),
  channel: z.string().optional().describe("Conversation to leave"),
})

export const ConversationsLeaveOutput = z.object({
  not_in_channel: z.literal(true).optional(),
  ok: z.literal(true),
}).describe("Schema for successful response from conversations.leave method")

export const conversationsLeave = pikkuSessionlessFunc({
  description: "Leaves a conversation.",
  input: ConversationsLeaveInput,
  output: ConversationsLeaveOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/conversations.leave", data) as any
  },
})
