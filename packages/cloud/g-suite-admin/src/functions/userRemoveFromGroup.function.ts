import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserRemoveFromGroupInput = z.object({
  groupId: z.string(),
  userId: z.string(),
})

export const UserRemoveFromGroupOutput = z.record(z.string(), z.unknown())

export const userRemoveFromGroup = pikkuSessionlessFunc({
  description: "Remove a user from a group",
  input: UserRemoveFromGroupInput,
  output: UserRemoveFromGroupOutput,
  func: async ({ gSuiteAdmin }, data) => {
    return gSuiteAdmin.call("DELETE", "/directory/v1/groups/{groupId}/members/{userId}", data) as any
  },
})
