import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const AuthSigninInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  email: z.string().email().describe("Email address of the user"),
  password: z.string().describe("Password of the user"),
})

export const AuthSigninOutput = z.object({
  token: z.string().optional().describe("The signed JWT token for information exchange"),
})

export const authSignin = pikkuSessionlessFunc({
  description: "Authenticate existing user with their email and password. Successful login will return a JWT access-token.",
  input: AuthSigninInput,
  output: AuthSigninOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/auth/user/signin", data) as any
  },
})
