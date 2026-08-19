import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGetInput = z.object({
  username: z.string(),
  details: z.string().optional(),
})

export const UserGetOutput = z.record(z.string(), z.unknown())

export const userGet = pikkuSessionlessFunc({
  description: "Get information about a user",
  input: UserGetInput,
  output: UserGetOutput,
  func: async ({ reddit }, data) => {
    return reddit.call("GET", "/user/{username}/about", data) as any
  },
})
