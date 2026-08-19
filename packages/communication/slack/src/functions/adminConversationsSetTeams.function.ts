import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminConversationsSetTeamsInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.conversations:write`"),
  channel_id: z.string().describe("The encoded `channel_id` to add or remove to workspaces."),
  org_channel: z.boolean().optional().describe("True if channel has to be converted to an org channel"),
  target_team_ids: z.string().optional().describe("A comma-separated list of workspaces to which the channel should be shared. Not required if the channel is being shared org-wide."),
  team_id: z.string().optional().describe("The workspace to which the channel belongs. Omit this argument if the channel is a cross-workspace shared channel."),
})

export const AdminConversationsSetTeamsOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminConversationsSetTeams = pikkuSessionlessFunc({
  description: "Set the workspaces in an Enterprise grid org that connect to a public or private channel.",
  input: AdminConversationsSetTeamsInput,
  output: AdminConversationsSetTeamsOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.conversations.setTeams", data) as any
  },
})
