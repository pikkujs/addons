import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UsersLookupByEmailInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `users:read.email`"),
  email: z.string().describe("An email address belonging to a user in the workspace"),
})

export const UsersLookupByEmailOutput = z.object({
  ok: z.literal(true),
  user: z.unknown(),
}).describe("Schema for successful response from users.lookupByEmail method")

export const usersLookupByEmail = pikkuSessionlessFunc({
  description: "Find a user with an email address.",
  input: UsersLookupByEmailInput,
  output: UsersLookupByEmailOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/users.lookupByEmail", data) as any
  },
})
