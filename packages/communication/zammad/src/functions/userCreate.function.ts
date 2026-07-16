import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCreateInput = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().optional(),
})

export const UserCreateOutput = z.record(z.string(), z.unknown())

export const userCreate = pikkuSessionlessFunc({
  description: "Create a user",
  input: UserCreateInput,
  output: UserCreateOutput,
  func: async ({ zammad }, data) => {
    return zammad.call("POST", "/users", data) as any
  },
})
