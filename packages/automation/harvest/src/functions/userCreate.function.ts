import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCreateInput = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().optional(),
})

export const UserCreateOutput = z.record(z.string(), z.unknown())

export const userCreate = pikkuSessionlessFunc({
  description: "User create",
  input: UserCreateInput,
  output: UserCreateOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("POST", "/users", data) as any
  },
})
