import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UsersSetActiveInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `users:write`"),
})

export const UsersSetActiveOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response from users.setActive method")

export const usersSetActive = pikkuSessionlessFunc({
  description: "Marked a user as active. Deprecated and non-functional.",
  input: UsersSetActiveInput,
  output: UsersSetActiveOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/users.setActive", data) as any
  },
})
