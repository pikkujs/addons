import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGroupRemoveInput = z.object({
  groupId: z.string(),
  usernames: z.string().optional(),
})

export const UserGroupRemoveOutput = z.record(z.string(), z.unknown())

export const userGroupRemove = pikkuSessionlessFunc({
  description: "Remove users from a group",
  input: UserGroupRemoveInput,
  output: UserGroupRemoveOutput,
  func: async ({ discourse }, data) => {
    return discourse.call("DELETE", "/groups/{groupId}/members.json", data) as any
  },
})
