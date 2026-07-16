import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const AuthMeInput = z.object({
  base_id: z.string().min(0).max(20).optional().describe("Model for ID").describe("Pass base id to get base specific roles along with user info"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const AuthMeOutput = z.object({
  email: z.string().email().optional().describe("User Email"),
  email_verified: z.boolean().optional().describe("Set to true if the user's email has been verified."),
  firstname: z.string().optional().describe("The firstname of the user"),
  id: z.string().optional().describe("User ID"),
  lastname: z.string().optional().describe("The lastname of the user"),
  roles: z.unknown().optional().describe("The roles of the user"),
  base_roles: z.unknown().optional().describe("The base roles of the user"),
  workspace_roles: z.unknown().optional().describe("The workspace roles of the user"),
}).describe("Model for User Info")

export const authMe = pikkuSessionlessFunc({
  description: "Returns authenticated user info",
  input: AuthMeInput,
  output: AuthMeOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/auth/user/me", data) as any
  },
})
