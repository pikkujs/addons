import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGetInput = z.object({
  userId: z.string(),
  client_gravatar: z.boolean().optional(),
})

export const UserGetOutput = z.record(z.string(), z.unknown())

export const userGet = pikkuSessionlessFunc({
  description: "Get a user",
  input: UserGetInput,
  output: UserGetOutput,
  func: async ({ zulip }, data) => {
    return zulip.call("GET", "/users/{userId}", data) as any
  },
})
