import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ConversationsKickInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `conversations:write`"),
  channel: z.string().optional().describe("ID of conversation to remove user from."),
  user: z.string().optional().describe("User ID to be removed."),
})

export const ConversationsKickOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response conversations.kick method")

export const conversationsKick = pikkuSessionlessFunc({
  description: "Removes a user from a conversation.",
  input: ConversationsKickInput,
  output: ConversationsKickOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/conversations.kick", data) as any
  },
})
