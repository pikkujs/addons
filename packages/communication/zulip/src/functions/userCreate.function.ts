import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCreateInput = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
  full_name: z.string().optional(),
  short_name: z.string().optional(),
})

export const UserCreateOutput = z.record(z.string(), z.unknown())

export const userCreate = pikkuSessionlessFunc({
  description: "Create a user",
  input: UserCreateInput,
  output: UserCreateOutput,
  func: async ({ zulip }, data) => {
    return zulip.call("POST", "/users", data) as any
  },
})
