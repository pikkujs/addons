import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserAddToGroupInput = z.object({
  groupId: z.string(),
  email: z.string().optional(),
  role: z.string().optional(),
})

export const UserAddToGroupOutput = z.record(z.string(), z.unknown())

export const userAddToGroup = pikkuSessionlessFunc({
  description: "Add a user to a group",
  input: UserAddToGroupInput,
  output: UserAddToGroupOutput,
  func: async ({ gSuiteAdmin }, data) => {
    return gSuiteAdmin.call("POST", "/directory/v1/groups/{groupId}/members", data) as any
  },
})
