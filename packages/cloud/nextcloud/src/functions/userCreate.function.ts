import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCreateInput = z.object({
  userid: z.string().optional(),
  email: z.string().optional(),
  displayName: z.string().optional(),
})

export const UserCreateOutput = z.record(z.string(), z.unknown())

export const userCreate = pikkuSessionlessFunc({
  description: "Create a user",
  input: UserCreateInput,
  output: UserCreateOutput,
  func: async ({ nextcloud }, data) => {
    return nextcloud.call("POST", "/users", data) as any
  },
})
