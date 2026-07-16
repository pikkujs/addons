import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UsersInfoInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `users:read`"),
  include_locale: z.boolean().optional().describe("Set this to `true` to receive the locale for this user. Defaults to `false`"),
  user: z.string().optional().describe("User to get info on"),
})

export const UsersInfoOutput = z.object({
  ok: z.literal(true),
  user: z.unknown(),
}).describe("Schema for successful response from users.info method")

export const usersInfo = pikkuSessionlessFunc({
  description: "Gets information about a user.",
  input: UsersInfoInput,
  output: UsersInfoOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/users.info", data) as any
  },
})
