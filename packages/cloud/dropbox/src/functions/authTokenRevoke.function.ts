import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AuthTokenRevokeInput = z.object({
  body: z.unknown(),
})

export const AuthTokenRevokeOutput = z.unknown()

export const authTokenRevoke = pikkuSessionlessFunc({
  description: "Disables the access token used to authenticate the call.",
  input: AuthTokenRevokeInput,
  output: AuthTokenRevokeOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/auth/token/revoke", data) as any
  },
})
