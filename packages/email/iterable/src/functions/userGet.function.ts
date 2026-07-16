import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserGetInput = z.object({
  email: z.string(),
})

export const UserGetOutput = z.record(z.string(), z.unknown())

export const userGet = pikkuSessionlessFunc({
  description: "Get a user by email",
  input: UserGetInput,
  output: UserGetOutput,
  func: async ({ iterable }, data) => {
    return iterable.call("GET", "/users/getByEmail", data) as any
  },
})
