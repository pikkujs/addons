import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const AuthPasswordForgotInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  email: z.string().email().describe("Email address of the user"),
})

export const AuthPasswordForgotOutput = z.object({
  msg: z.string().optional().describe("Success Message"),
})

export const authPasswordForgot = pikkuSessionlessFunc({
  description: "Emails user with a reset url.",
  input: AuthPasswordForgotInput,
  output: AuthPasswordForgotOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/auth/password/forgot", data) as any
  },
})
