import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RequestEndUserVerificationInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
  user_identity_id: z.number().int().describe("The ID of the user identity. Example: 77938"),
})

export const RequestEndUserVerificationOutput = z.string().describe("Empty response")

export const requestEndUserVerification = pikkuSessionlessFunc({
  description: "Sends the end user a verification email with a link to verify ownership of the email address.\n\n#### Allowed For\n\n* Verified end users",
  input: RequestEndUserVerificationInput,
  output: RequestEndUserVerificationOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/end_users/{user_id}/identities/{user_identity_id}/request_verification", data) as any
  },
})
