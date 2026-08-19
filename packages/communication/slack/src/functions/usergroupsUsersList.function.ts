import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UsergroupsUsersListInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `usergroups:read`"),
  include_disabled: z.boolean().optional().describe("Allow results that involve disabled User Groups."),
  usergroup: z.string().describe("The encoded ID of the User Group to update."),
})

export const UsergroupsUsersListOutput = z.object({
  ok: z.literal(true),
  users: z.array(z.string()),
}).describe("Schema for successful response from usergroups.users.list method")

export const usergroupsUsersList = pikkuSessionlessFunc({
  description: "List all users in a User Group",
  input: UsergroupsUsersListInput,
  output: UsergroupsUsersListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/usergroups.users.list", data) as any
  },
})
