import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OauthAccessInput = z.object({
  client_id: z.string().optional().describe("Issued when you created your application."),
  client_secret: z.string().optional().describe("Issued when you created your application."),
  code: z.string().optional().describe("The `code` param returned via the OAuth callback."),
  redirect_uri: z.string().optional().describe("This must match the originally submitted URI (if one was sent)."),
  single_channel: z.boolean().optional().describe("Request the user to add your app only to a single channel. Only valid with a [legacy workspace app](https://api.slack.com/legacy-workspace-apps)."),
})

export const OauthAccessOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const oauthAccess = pikkuSessionlessFunc({
  description: "Exchanges a temporary OAuth verifier code for an access token.",
  input: OauthAccessInput,
  output: OauthAccessOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/oauth.access", data) as any
  },
})
