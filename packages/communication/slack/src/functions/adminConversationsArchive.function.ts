import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminConversationsArchiveInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.conversations:write`"),
  channel_id: z.string().describe("The channel to archive."),
})

export const AdminConversationsArchiveOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response of admin.conversations.archive")

export const adminConversationsArchive = pikkuSessionlessFunc({
  description: "Archive a public or private channel.",
  input: AdminConversationsArchiveInput,
  output: AdminConversationsArchiveOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.conversations.archive", data) as any
  },
})
