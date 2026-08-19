import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LogoutManyUsersInput = z.object({
  ids: z.string().optional().describe("Accepts a comma-separated list of up to 100 user ids.\n. Example: \"1,2\""),
})

export const LogoutManyUsersOutput = z.string().describe("Empty response")

export const logoutManyUsers = pikkuSessionlessFunc({
  description: "Accepts a comma-separated list of up to 100 user ids.\n\n#### Allowed For:\n\n* Admins",
  input: LogoutManyUsersInput,
  output: LogoutManyUsersOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/users/logout_many", data) as any
  },
})
