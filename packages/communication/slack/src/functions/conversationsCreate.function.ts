import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ConversationsCreateInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `conversations:write`"),
  is_private: z.boolean().optional().describe("Create a private channel instead of a public one"),
  name: z.string().optional().describe("Name of the public or private channel to create"),
})

export const ConversationsCreateOutput = z.object({
  channel: z.unknown(),
  ok: z.literal(true),
}).describe("Schema for successful response conversations.create method")

export const conversationsCreate = pikkuSessionlessFunc({
  description: "Initiates a public or private channel-based conversation",
  input: ConversationsCreateInput,
  output: ConversationsCreateOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/conversations.create", data) as any
  },
})
