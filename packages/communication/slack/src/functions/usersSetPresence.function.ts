import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UsersSetPresenceInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `users:write`"),
  presence: z.string().describe("Either `auto` or `away`"),
})

export const UsersSetPresenceOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response from users.setPresence method")

export const usersSetPresence = pikkuSessionlessFunc({
  description: "Manually sets user presence.",
  input: UsersSetPresenceInput,
  output: UsersSetPresenceOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/users.setPresence", data) as any
  },
})
