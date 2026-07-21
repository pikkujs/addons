import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminConversationsRenameInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.conversations:write`"),
  channel_id: z.string().describe("The channel to rename."),
  name: z.string(),
})

export const AdminConversationsRenameOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response of admin.conversations.rename")

export const adminConversationsRename = pikkuSessionlessFunc({
  description: "Rename a public or private channel.",
  input: AdminConversationsRenameInput,
  output: AdminConversationsRenameOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.conversations.rename", data) as any
  },
})
