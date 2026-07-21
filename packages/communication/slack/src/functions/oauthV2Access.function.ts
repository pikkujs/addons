import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OauthV2AccessInput = z.object({
  client_id: z.string().optional().describe("Issued when you created your application."),
  client_secret: z.string().optional().describe("Issued when you created your application."),
  code: z.string().describe("The `code` param returned via the OAuth callback."),
  redirect_uri: z.string().optional().describe("This must match the originally submitted URI (if one was sent)."),
})

export const OauthV2AccessOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const oauthV2Access = pikkuSessionlessFunc({
  description: "Exchanges a temporary OAuth verifier code for an access token.",
  input: OauthV2AccessInput,
  output: OauthV2AccessOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/oauth.v2.access", data) as any
  },
})
