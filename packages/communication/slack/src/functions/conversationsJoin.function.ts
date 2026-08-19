import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ConversationsJoinInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `channels:write`"),
  channel: z.string().optional().describe("ID of conversation to join"),
})

export const ConversationsJoinOutput = z.object({
  channel: z.unknown(),
  ok: z.literal(true),
  response_metadata: z.object({
    warnings: z.array(z.string()).min(1).optional(),
  }).optional(),
  warning: z.string().optional(),
}).describe("Schema for successful response from conversations.join method")

export const conversationsJoin = pikkuSessionlessFunc({
  description: "Joins an existing conversation.",
  input: ConversationsJoinInput,
  output: ConversationsJoinOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/conversations.join", data) as any
  },
})
