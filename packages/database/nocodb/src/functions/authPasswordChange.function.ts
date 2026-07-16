import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const AuthPasswordChangeInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  currentPassword: z.string().min(8).max(128),
  newPassword: z.string().min(8).max(128),
})

export const AuthPasswordChangeOutput = z.object({
  msg: z.string().optional().describe("Success Message"),
})

export const authPasswordChange = pikkuSessionlessFunc({
  description: "Change password of authenticated user with a new one.",
  input: AuthPasswordChangeInput,
  output: AuthPasswordChangeOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/auth/password/change", data) as any
  },
})
