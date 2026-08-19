import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RequestUserVerificationInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
  user_identity_id: z.number().int().describe("The ID of the user identity. Example: 77938"),
  brand_id: z.number().int().optional().describe("When the account has multiple active brands, sets the active brand context\nfor the verification email. Scopes the email template and sender to the specified brand.\n. Example: 123"),
})

export const RequestUserVerificationOutput = z.string().describe("Empty response")

export const requestUserVerification = pikkuSessionlessFunc({
  description: "Sends the user a verification email with a link to verify ownership of the email address.\n\n#### Allowed For\n\n* Agents",
  input: RequestUserVerificationInput,
  output: RequestUserVerificationOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/users/{user_id}/identities/{user_identity_id}/request_verification", data) as any
  },
})
