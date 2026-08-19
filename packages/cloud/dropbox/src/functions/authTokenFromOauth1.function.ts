import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AuthTokenFromOauth1Input = z.object({
  oauth1_token: z.string().optional().describe("The supplied OAuth 1.0 access token."),
  oauth1_token_secret: z.string().optional().describe("The token secret associated with the supplied access token."),
})

export const AuthTokenFromOauth1Output = z.object({
  oauth2_token: z.string().optional().describe("The OAuth 2.0 token generated from the supplied OAuth 1.0 token."),
}).describe("oauth2_token: The OAuth 2.0 token generated from the supplied OAuth 1.0 token.\n")

export const authTokenFromOauth1 = pikkuSessionlessFunc({
  description: "Creates an OAuth 2.0 access token from the supplied OAuth 1.0 access token.",
  input: AuthTokenFromOauth1Input,
  output: AuthTokenFromOauth1Output,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/auth/token/from_oauth1", data) as any
  },
})
