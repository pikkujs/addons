import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const AuthBaseUserRemoveInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  userId: z.string().min(0).max(20).describe("Model for ID").describe("Unique User ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const AuthBaseUserRemoveOutput = z.object({
  msg: z.string().optional().describe("Success Message"),
})

export const authBaseUserRemove = pikkuSessionlessFunc({
  description: "Delete a given user in a given base. Exclusive for Super Admin. Access with API Tokens will be blocked.",
  input: AuthBaseUserRemoveInput,
  output: AuthBaseUserRemoveOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/db/meta/projects/{baseId}/users/{userId}", data) as any
  },
})
