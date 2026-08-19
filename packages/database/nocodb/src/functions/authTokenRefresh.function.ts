import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const AuthTokenRefreshInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const AuthTokenRefreshOutput = z.object({
  token: z.string().optional().describe("New JWT auth token for user"),
})

export const authTokenRefresh = pikkuSessionlessFunc({
  description: "Creates a new refresh token and JWT auth token for the user. The refresh token is sent as a cookie, while the JWT auth token is included in the response body.",
  input: AuthTokenRefreshInput,
  output: AuthTokenRefreshOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/auth/token/refresh", data) as any
  },
})
