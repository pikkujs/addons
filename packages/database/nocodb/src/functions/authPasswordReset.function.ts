import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const AuthPasswordResetInput = z.object({
  token: z.string().uuid().describe("Reset Password Token"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  password: z.string().min(8).max(128).describe("New password"),
})

export const AuthPasswordResetOutput = z.object({
  msg: z.string().optional().describe("Success Message"),
})

export const authPasswordReset = pikkuSessionlessFunc({
  description: "Update user password to new by using reset token.",
  input: AuthPasswordResetInput,
  output: AuthPasswordResetOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/auth/password/reset/{token}", data) as any
  },
})
