import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminConversationsConvertToPrivateInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.conversations:write`"),
  channel_id: z.string().describe("The channel to convert to private."),
})

export const AdminConversationsConvertToPrivateOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response of admin.conversations.convertToPrivate")

export const adminConversationsConvertToPrivate = pikkuSessionlessFunc({
  description: "Convert a public channel to a private channel.",
  input: AdminConversationsConvertToPrivateInput,
  output: AdminConversationsConvertToPrivateOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.conversations.convertToPrivate", data) as any
  },
})
