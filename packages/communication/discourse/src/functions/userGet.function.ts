import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGetInput = z.object({
  username: z.string(),
})

export const UserGetOutput = z.record(z.string(), z.unknown())

export const userGet = pikkuSessionlessFunc({
  description: "Get a user by username",
  input: UserGetInput,
  output: UserGetOutput,
  func: async ({ discourse }, data) => {
    return discourse.call("GET", "/users/{username}", data) as any
  },
})
