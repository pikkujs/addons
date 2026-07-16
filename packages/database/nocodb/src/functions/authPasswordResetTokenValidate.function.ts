import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const AuthPasswordResetTokenValidateInput = z.object({
  token: z.string().uuid().describe("Reset Token"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const AuthPasswordResetTokenValidateOutput = z.object({
  msg: z.string().optional().describe("Success Message"),
})

export const authPasswordResetTokenValidate = pikkuSessionlessFunc({
  description: "Validate password reset url token.",
  input: AuthPasswordResetTokenValidateInput,
  output: AuthPasswordResetTokenValidateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/auth/token/validate/{token}", data) as any
  },
})
