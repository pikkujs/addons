import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const OrgUsersResendInviteInput = z.object({
  userId: z.string().min(0).max(20).describe("Model for ID").describe("Unique User ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const OrgUsersResendInviteOutput = z.object({
  msg: z.string().optional().describe("Success Message"),
})

export const orgUsersResendInvite = pikkuSessionlessFunc({
  description: "Resend Invitation to a specific user. Exclusive for Super Admin. Access with API Tokens will be blocked.",
  input: OrgUsersResendInviteInput,
  output: OrgUsersResendInviteOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/users/{userId}/resend-invite", data) as any
  },
})
