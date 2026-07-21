import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminConversationsUnarchiveInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.conversations:write`"),
  channel_id: z.string().describe("The channel to unarchive."),
})

export const AdminConversationsUnarchiveOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response of admin.conversations.unarchive")

export const adminConversationsUnarchive = pikkuSessionlessFunc({
  description: "Unarchive a public or private channel.",
  input: AdminConversationsUnarchiveInput,
  output: AdminConversationsUnarchiveOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.conversations.unarchive", data) as any
  },
})
