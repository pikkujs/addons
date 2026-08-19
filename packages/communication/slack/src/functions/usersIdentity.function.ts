import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UsersIdentityInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `identity.basic`"),
})

export const UsersIdentityOutput = z.unknown().describe("Schema for successful response from users.identity method")

export const usersIdentity = pikkuSessionlessFunc({
  description: "Get a user's identity.",
  input: UsersIdentityInput,
  output: UsersIdentityOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/users.identity", data) as any
  },
})
