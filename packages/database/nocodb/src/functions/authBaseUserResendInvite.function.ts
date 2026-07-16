import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const AuthBaseUserResendInviteInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  userId: z.string().min(0).max(20).describe("Model for ID").describe("Unique User ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const AuthBaseUserResendInviteOutput = z.object({
  msg: z.string().optional().describe("Success Message"),
})

export const authBaseUserResendInvite = pikkuSessionlessFunc({
  description: "Resend Invitation to a specific user",
  input: AuthBaseUserResendInviteInput,
  output: AuthBaseUserResendInviteOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/projects/{baseId}/users/{userId}/resend-invite", data) as any
  },
})
