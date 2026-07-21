import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ConversationsRenameInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `conversations:write`"),
  channel: z.string().optional().describe("ID of conversation to rename"),
  name: z.string().optional().describe("New name for conversation."),
})

export const ConversationsRenameOutput = z.object({
  channel: z.unknown(),
  ok: z.literal(true),
}).describe("Schema for successful response from conversations.rename method")

export const conversationsRename = pikkuSessionlessFunc({
  description: "Renames a conversation.",
  input: ConversationsRenameInput,
  output: ConversationsRenameOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/conversations.rename", data) as any
  },
})
