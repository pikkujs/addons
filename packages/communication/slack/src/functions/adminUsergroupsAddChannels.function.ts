import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminUsergroupsAddChannelsInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.usergroups:write`"),
  channel_ids: z.string().describe("Comma separated string of channel IDs."),
  team_id: z.string().optional().describe("The workspace to add default channels in."),
  usergroup_id: z.string().describe("ID of the IDP group to add default channels for."),
})

export const AdminUsergroupsAddChannelsOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminUsergroupsAddChannels = pikkuSessionlessFunc({
  description: "Add one or more default channels to an IDP group.",
  input: AdminUsergroupsAddChannelsInput,
  output: AdminUsergroupsAddChannelsOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.usergroups.addChannels", data) as any
  },
})
