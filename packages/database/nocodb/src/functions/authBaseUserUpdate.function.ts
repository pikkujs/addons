import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const AuthBaseUserUpdateInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  userId: z.string().min(0).max(20).describe("Model for ID").describe("Unique User ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  email: z.string().describe("Base User Email"),
  roles: z.enum(["no-access", "commenter", "editor", "guest", "owner", "viewer", "creator", "inherit"]).describe("Base User Role"),
})

export const AuthBaseUserUpdateOutput = z.object({
  msg: z.string().optional().describe("Success Message"),
})

export const authBaseUserUpdate = pikkuSessionlessFunc({
  description: "Update a given user in a given base. Exclusive for Super Admin. Access with API Tokens will be blocked.",
  input: AuthBaseUserUpdateInput,
  output: AuthBaseUserUpdateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/meta/projects/{baseId}/users/{userId}", data) as any
  },
})
