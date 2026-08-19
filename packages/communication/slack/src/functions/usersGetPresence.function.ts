import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UsersGetPresenceInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `users:read`"),
  user: z.string().optional().describe("User to get presence info on. Defaults to the authed user."),
})

export const UsersGetPresenceOutput = z.object({
  auto_away: z.boolean().optional(),
  connection_count: z.number().int().optional(),
  last_activity: z.number().int().optional(),
  manual_away: z.boolean().optional(),
  ok: z.literal(true),
  online: z.boolean().optional(),
  presence: z.string(),
}).describe("Generated from users.getPresence with shasum e7251aec575d8863f9e0eb38663ae9dc26655f65")

export const usersGetPresence = pikkuSessionlessFunc({
  description: "Gets user presence information.",
  input: UsersGetPresenceInput,
  output: UsersGetPresenceOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/users.getPresence", data) as any
  },
})
