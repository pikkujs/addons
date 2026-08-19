import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGetInput = z.object({
  userId: z.string(),
})

export const UserGetOutput = z.record(z.string(), z.unknown())

export const userGet = pikkuSessionlessFunc({
  description: "User get",
  input: UserGetInput,
  output: UserGetOutput,
  func: async ({ asana }, data) => {
    return asana.call("GET", "/users/{userId}", data) as any
  },
})
