import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UsergroupsDisableInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `usergroups:write`"),
  include_count: z.boolean().optional().describe("Include the number of users in the User Group."),
  usergroup: z.string().describe("The encoded ID of the User Group to disable."),
})

export const UsergroupsDisableOutput = z.object({
  ok: z.literal(true),
  usergroup: z.object({
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
  }),
}).describe("Schema for successful response from usergroups.disable method")

export const usergroupsDisable = pikkuSessionlessFunc({
  description: "Disable an existing User Group",
  input: UsergroupsDisableInput,
  output: UsergroupsDisableOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/usergroups.disable", data) as any
  },
})
