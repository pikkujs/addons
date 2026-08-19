import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminConversationsRestrictAccessRemoveGroupInput = z.object({
  channel_id: z.string().describe("The channel to remove the linked group from."),
  group_id: z.string().describe("The [IDP Group](https://slack.com/help/articles/115001435788-Connect-identity-provider-groups-to-your-Enterprise-Grid-org) ID to remove from the private channel."),
  team_id: z.string().describe("The workspace where the channel exists. This argument is required for channels only tied to one workspace, and optional for channels that are shared across an organization."),
  token: z.string().describe("Authentication token. Requires scope: `admin.conversations:write`"),
})

export const AdminConversationsRestrictAccessRemoveGroupOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminConversationsRestrictAccessRemoveGroup = pikkuSessionlessFunc({
  description: "Remove a linked IDP group linked from a private channel",
  input: AdminConversationsRestrictAccessRemoveGroupInput,
  output: AdminConversationsRestrictAccessRemoveGroupOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.conversations.restrictAccess.removeGroup", data) as any
  },
})
