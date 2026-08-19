import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChangeOwnPasswordInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
  brand_id: z.number().int().optional().describe("Sets the active brand context for the password change. Used to scope the session\nto the correct brand when the account has multiple active brands.\n. Example: 123"),
})

export const ChangeOwnPasswordOutput = z.string().describe("Empty response")

export const changeOwnPassword = pikkuSessionlessFunc({
  description: "You can only change your own password. Nobody can change the password of another user because it requires knowing the user's existing password. However, an admin can set a new password for another user without knowing the existing password. See [Set a User's Password](#set-a-users-password) above.\n\n#### Allowed For\n\n* Agents\n* End Users",
  input: ChangeOwnPasswordInput,
  output: ChangeOwnPasswordOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/users/{user_id}/password", data) as any
  },
})
