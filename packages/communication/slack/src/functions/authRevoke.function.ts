import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AuthRevokeInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `none`"),
  test: z.boolean().optional().describe("Setting this parameter to `1` triggers a _testing mode_ where the specified token will not actually be revoked."),
})

export const AuthRevokeOutput = z.object({
  ok: z.literal(true),
  revoked: z.boolean(),
}).describe("Schema for successful response from auth.revoke method")

export const authRevoke = pikkuSessionlessFunc({
  description: "Revokes a token.",
  input: AuthRevokeInput,
  output: AuthRevokeOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/auth.revoke", data) as any
  },
})
