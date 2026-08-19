import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminConversationsDisconnectSharedInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.conversations:write`"),
  channel_id: z.string().describe("The channel to be disconnected from some workspaces."),
  leaving_team_ids: z.string().optional().describe("The team to be removed from the channel. Currently only a single team id can be specified."),
})

export const AdminConversationsDisconnectSharedOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response of admin.conversations.disconnectShared")

export const adminConversationsDisconnectShared = pikkuSessionlessFunc({
  description: "Disconnect a connected channel from one or more workspaces.",
  input: AdminConversationsDisconnectSharedInput,
  output: AdminConversationsDisconnectSharedOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.conversations.disconnectShared", data) as any
  },
})
