import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AuthTestInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `none`"),
})

export const AuthTestOutput = z.object({
  bot_id: z.string().regex(new RegExp("^B[A-Z0-9]{8,}$")).optional(),
  is_enterprise_install: z.boolean().optional(),
  ok: z.literal(true),
  team: z.string(),
  team_id: z.string().regex(new RegExp("^[T][A-Z0-9]{2,}$")),
  url: z.string(),
  user: z.string(),
  user_id: z.string().regex(new RegExp("^[UW][A-Z0-9]{2,}$")),
}).describe("Schema for successful response auth.test method")

export const authTest = pikkuSessionlessFunc({
  description: "Checks authentication & identity.",
  input: AuthTestInput,
  output: AuthTestOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/auth.test", data) as any
  },
})
