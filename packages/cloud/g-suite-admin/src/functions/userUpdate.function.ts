import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserUpdateInput = z.object({
  userId: z.string(),
  primaryEmail: z.string().optional(),
  password: z.string().optional(),
  suspended: z.boolean().optional(),
})

export const UserUpdateOutput = z.record(z.string(), z.unknown())

export const userUpdate = pikkuSessionlessFunc({
  description: "Update a user",
  input: UserUpdateInput,
  output: UserUpdateOutput,
  func: async ({ gSuiteAdmin }, data) => {
    return gSuiteAdmin.call("PUT", "/directory/v1/users/{userId}", data) as any
  },
})
