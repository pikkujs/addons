import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminUsersSetExpirationInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.users:write`"),
  expiration_ts: z.number().int().describe("Timestamp when guest account should be disabled."),
  team_id: z.string().describe("The ID (`T1234`) of the workspace."),
  user_id: z.string().describe("The ID of the user to set an expiration for."),
})

export const AdminUsersSetExpirationOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminUsersSetExpiration = pikkuSessionlessFunc({
  description: "Set an expiration for a guest user",
  input: AdminUsersSetExpirationInput,
  output: AdminUsersSetExpirationOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.users.setExpiration", data) as any
  },
})
