import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const AuthSignoutInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const AuthSignoutOutput = z.object({
  msg: z.string().optional().describe("Success Message"),
})

export const authSignout = pikkuSessionlessFunc({
  description: "Clear refresh token from the database and cookie.",
  input: AuthSignoutInput,
  output: AuthSignoutOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/auth/user/signout", data) as any
  },
})
