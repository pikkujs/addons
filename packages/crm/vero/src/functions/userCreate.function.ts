import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCreateInput = z.object({
  body: z.string().optional(),
})

export const UserCreateOutput = z.record(z.string(), z.unknown())

export const userCreate = pikkuSessionlessFunc({
  description: "User create",
  input: UserCreateInput,
  output: UserCreateOutput,
  func: async ({ vero }, data) => {
    return vero.call("POST", "/users/track", data) as any
  },
})
