import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminConversationsRestrictAccessListGroupsInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.conversations:read`"),
  channel_id: z.string(),
  team_id: z.string().optional().describe("The workspace where the channel exists. This argument is required for channels only tied to one workspace, and optional for channels that are shared across an organization."),
})

export const AdminConversationsRestrictAccessListGroupsOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminConversationsRestrictAccessListGroups = pikkuSessionlessFunc({
  description: "List all IDP Groups linked to a channel",
  input: AdminConversationsRestrictAccessListGroupsInput,
  output: AdminConversationsRestrictAccessListGroupsOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/admin.conversations.restrictAccess.listGroups", data) as any
  },
})
