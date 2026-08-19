import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const OrgUsersGeneratePasswordResetTokenInput = z.object({
  userId: z.string().min(0).max(20).describe("Model for ID").describe("Unique User ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const OrgUsersGeneratePasswordResetTokenOutput = z.object({
  reset_password_token: z.string().optional().describe("Password Reset Token for the user"),
  reset_password_url: z.string().optional().describe("Password Reset URL for the user"),
})

export const orgUsersGeneratePasswordResetToken = pikkuSessionlessFunc({
  description: "Generate Password Reset Token for Organisation User. Exclusive for Super Admin. Access with API Tokens will be blocked.",
  input: OrgUsersGeneratePasswordResetTokenInput,
  output: OrgUsersGeneratePasswordResetTokenOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/users/{userId}/generate-reset-url", data) as any
  },
})
