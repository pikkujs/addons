import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminConversationsRestrictAccessAddGroupInput = z.object({
  channel_id: z.string().describe("The channel to link this group to."),
  group_id: z.string().describe("The [IDP Group](https://slack.com/help/articles/115001435788-Connect-identity-provider-groups-to-your-Enterprise-Grid-org) ID to be an allowlist for the private channel."),
  team_id: z.string().optional().describe("The workspace where the channel exists. This argument is required for channels only tied to one workspace, and optional for channels that are shared across an organization."),
  token: z.string().describe("Authentication token. Requires scope: `admin.conversations:write`"),
})

export const AdminConversationsRestrictAccessAddGroupOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminConversationsRestrictAccessAddGroup = pikkuSessionlessFunc({
  description: "Add an allowlist of IDP groups for accessing a channel",
  input: AdminConversationsRestrictAccessAddGroupInput,
  output: AdminConversationsRestrictAccessAddGroupOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.conversations.restrictAccess.addGroup", data) as any
  },
})
