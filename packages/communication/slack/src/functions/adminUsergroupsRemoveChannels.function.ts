import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminUsergroupsRemoveChannelsInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.usergroups:write`"),
  channel_ids: z.string().describe("Comma-separated string of channel IDs"),
  usergroup_id: z.string().describe("ID of the IDP Group"),
})

export const AdminUsergroupsRemoveChannelsOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminUsergroupsRemoveChannels = pikkuSessionlessFunc({
  description: "Remove one or more default channels from an org-level IDP group (user group).",
  input: AdminUsergroupsRemoveChannelsInput,
  output: AdminUsergroupsRemoveChannelsOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.usergroups.removeChannels", data) as any
  },
})
