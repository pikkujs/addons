import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserGetAllInput = z.object({
  client_gravatar: z.boolean().optional(),
})

export const UserGetAllOutput = z.record(z.string(), z.unknown())

export const userGetAll = pikkuSessionlessFunc({
  description: "Get all users",
  input: UserGetAllInput,
  output: UserGetAllOutput,
  func: async ({ zulip }, data) => {
    return zulip.call("GET", "/users", data) as any
  },
})
