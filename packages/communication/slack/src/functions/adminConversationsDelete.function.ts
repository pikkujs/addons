import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminConversationsDeleteInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.conversations:write`"),
  channel_id: z.string().describe("The channel to delete."),
})

export const AdminConversationsDeleteOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response of admin.conversations.delete")

export const adminConversationsDelete = pikkuSessionlessFunc({
  description: "Delete a public or private channel.",
  input: AdminConversationsDeleteInput,
  output: AdminConversationsDeleteOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.conversations.delete", data) as any
  },
})
