import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ConversationsInfoInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `conversations:read`"),
  channel: z.string().optional().describe("Conversation ID to learn more about"),
  include_locale: z.boolean().optional().describe("Set this to `true` to receive the locale for this conversation. Defaults to `false`"),
  include_num_members: z.boolean().optional().describe("Set to `true` to include the member count for the specified conversation. Defaults to `false`"),
})

export const ConversationsInfoOutput = z.object({
  channel: z.unknown(),
  ok: z.literal(true),
}).describe("Schema for successful response conversations.info")

export const conversationsInfo = pikkuSessionlessFunc({
  description: "Retrieve information about a conversation.",
  input: ConversationsInfoInput,
  output: ConversationsInfoOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/conversations.info", data) as any
  },
})
