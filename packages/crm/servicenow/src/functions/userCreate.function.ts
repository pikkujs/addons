import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCreateInput = z.object({
  user_name: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().optional(),
})

export const UserCreateOutput = z.record(z.string(), z.unknown())

export const userCreate = pikkuSessionlessFunc({
  description: "Create a user",
  input: UserCreateInput,
  output: UserCreateOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("POST", "/now/table/sys_user", data) as any
  },
})
