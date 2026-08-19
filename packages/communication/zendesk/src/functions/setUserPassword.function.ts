import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SetUserPasswordInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const SetUserPasswordOutput = z.string().describe("Empty response")

export const setUserPassword = pikkuSessionlessFunc({
  description: "An admin can set a user's password only if the setting is enabled in Zendesk Support under **Settings** > **Security** > **Global**. The setting is off by default. Only the account owner can access and change this setting.\n\n#### Allowed For\n\n* Admins",
  input: SetUserPasswordInput,
  output: SetUserPasswordOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/users/{user_id}/password", data) as any
  },
})
