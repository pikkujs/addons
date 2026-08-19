import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminConversationsInviteInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.conversations:write`"),
  channel_id: z.string().describe("The channel that the users will be invited to."),
  user_ids: z.string().describe("The users to invite."),
})

export const AdminConversationsInviteOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response of admin.conversations.invite")

export const adminConversationsInvite = pikkuSessionlessFunc({
  description: "Invite a user to a public or private channel.",
  input: AdminConversationsInviteInput,
  output: AdminConversationsInviteOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.conversations.invite", data) as any
  },
})
