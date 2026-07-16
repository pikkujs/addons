import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UsergroupsListInput = z.object({
  include_users: z.boolean().optional().describe("Include the list of users for each User Group."),
  token: z.string().describe("Authentication token. Requires scope: `usergroups:read`"),
  include_count: z.boolean().optional().describe("Include the number of users in each User Group."),
  include_disabled: z.boolean().optional().describe("Include disabled User Groups."),
})

export const UsergroupsListOutput = z.object({
  ok: z.literal(true),
  usergroups: z.array(z.object({
    auto_provision: z.boolean(),
    auto_type: z.unknown(),
    channel_count: z.number().int().optional(),
    created_by: z.string().regex(new RegExp("^[UW][A-Z0-9]{2,}$")),
    date_create: z.number().int(),
    date_delete: z.number().int(),
    date_update: z.number().int(),
    deleted_by: z.unknown(),
    description: z.string(),
    enterprise_subteam_id: z.string(),
    handle: z.string(),
    id: z.string().regex(new RegExp("^S[A-Z0-9]{2,}$")),
    is_external: z.boolean(),
    is_subteam: z.boolean(),
    is_usergroup: z.boolean(),
    name: z.string(),
    prefs: z.object({
      channels: z.array(z.string()),
      groups: z.array(z.string()),
    }),
    team_id: z.string().regex(new RegExp("^[T][A-Z0-9]{2,}$")),
    updated_by: z.string().regex(new RegExp("^[UW][A-Z0-9]{2,}$")),
    user_count: z.number().int().optional(),
    users: z.array(z.string()).optional(),
  })),
}).describe("Schema for successful response from usergroups.list method")

export const usergroupsList = pikkuSessionlessFunc({
  description: "List all User Groups for a team",
  input: UsergroupsListInput,
  output: UsergroupsListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/usergroups.list", data) as any
  },
})
