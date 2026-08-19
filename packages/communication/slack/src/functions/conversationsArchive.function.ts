import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ConversationsArchiveInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `conversations:write`"),
  channel: z.string().optional().describe("ID of conversation to archive"),
})

export const ConversationsArchiveOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response conversations.archive method")

export const conversationsArchive = pikkuSessionlessFunc({
  description: "Archives a conversation.",
  input: ConversationsArchiveInput,
  output: ConversationsArchiveOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/conversations.archive", data) as any
  },
})
