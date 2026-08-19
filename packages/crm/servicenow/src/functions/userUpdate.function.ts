import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserUpdateInput = z.object({
  userId: z.string(),
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
})

export const UserUpdateOutput = z.record(z.string(), z.unknown())

export const userUpdate = pikkuSessionlessFunc({
  description: "Update a user",
  input: UserUpdateInput,
  output: UserUpdateOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("PATCH", "/now/table/sys_user/{userId}", data) as any
  },
})
