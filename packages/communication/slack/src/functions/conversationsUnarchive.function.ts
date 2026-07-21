import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ConversationsUnarchiveInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `conversations:write`"),
  channel: z.string().optional().describe("ID of conversation to unarchive"),
})

export const ConversationsUnarchiveOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response from conversations.unarchive method")

export const conversationsUnarchive = pikkuSessionlessFunc({
  description: "Reverses conversation archival.",
  input: ConversationsUnarchiveInput,
  output: ConversationsUnarchiveOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/conversations.unarchive", data) as any
  },
})
