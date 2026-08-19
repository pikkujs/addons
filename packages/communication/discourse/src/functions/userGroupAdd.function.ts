import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGroupAddInput = z.object({
  groupId: z.string(),
  usernames: z.string().optional(),
})

export const UserGroupAddOutput = z.record(z.string(), z.unknown())

export const userGroupAdd = pikkuSessionlessFunc({
  description: "Add users to a group",
  input: UserGroupAddInput,
  output: UserGroupAddOutput,
  func: async ({ discourse }, data) => {
    return discourse.call("PUT", "/groups/{groupId}/members.json", data) as any
  },
})
