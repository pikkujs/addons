import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ConversationsSetPurposeInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `conversations:write`"),
  channel: z.string().optional().describe("Conversation to set the purpose of"),
  purpose: z.string().optional().describe("A new, specialer purpose"),
})

export const ConversationsSetPurposeOutput = z.object({
  channel: z.unknown(),
  ok: z.literal(true),
}).describe("Schema for successful response from conversations.setPurpose method")

export const conversationsSetPurpose = pikkuSessionlessFunc({
  description: "Sets the purpose for a conversation.",
  input: ConversationsSetPurposeInput,
  output: ConversationsSetPurposeOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/conversations.setPurpose", data) as any
  },
})
