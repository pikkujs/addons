import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const AuthBaseUserAddInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  email: z.string().describe("Base User Email"),
  roles: z.enum(["no-access", "commenter", "editor", "guest", "owner", "viewer", "creator", "inherit"]).describe("Base User Role"),
})

export const AuthBaseUserAddOutput = z.object({
  msg: z.string().optional().describe("Success Message for inviting single email"),
  invite_token: z.string().optional(),
  error: z.array(z.object({
    email: z.string().optional(),
    error: z.string().optional(),
  })).optional(),
  email: z.string().optional(),
})

export const authBaseUserAdd = pikkuSessionlessFunc({
  description: "Create a user and add it to the given base",
  input: AuthBaseUserAddInput,
  output: AuthBaseUserAddOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/projects/{baseId}/users", data) as any
  },
})
