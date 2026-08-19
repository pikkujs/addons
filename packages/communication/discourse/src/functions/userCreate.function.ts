import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCreateInput = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  username: z.string().optional(),
})

export const UserCreateOutput = z.record(z.string(), z.unknown())

export const userCreate = pikkuSessionlessFunc({
  description: "Create a user",
  input: UserCreateInput,
  output: UserCreateOutput,
  func: async ({ discourse }, data) => {
    return discourse.call("POST", "/users.json", data) as any
  },
})
