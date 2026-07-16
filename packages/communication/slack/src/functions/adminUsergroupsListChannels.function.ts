import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminUsergroupsListChannelsInput = z.object({
  usergroup_id: z.string().describe("ID of the IDP group to list default channels for."),
  team_id: z.string().optional().describe("ID of the the workspace."),
  include_num_members: z.boolean().optional().describe("Flag to include or exclude the count of members per channel."),
  token: z.string().describe("Authentication token. Requires scope: `admin.usergroups:read`"),
})

export const AdminUsergroupsListChannelsOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminUsergroupsListChannels = pikkuSessionlessFunc({
  description: "List the channels linked to an org-level IDP group (user group).",
  input: AdminUsergroupsListChannelsInput,
  output: AdminUsergroupsListChannelsOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/admin.usergroups.listChannels", data) as any
  },
})
