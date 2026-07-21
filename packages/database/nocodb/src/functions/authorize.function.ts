import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const AuthorizeInput = z.object({
  client_id: z.string().describe("The client identifier"),
  redirect_uri: z.string().url().describe("The client redirection URI"),
  state: z.string().optional().describe("Opaque value used to maintain state between request and callback"),
  approved: z.boolean().optional().describe("Whether the user approved the authorization request"),
  code_challenge: z.string().optional().describe("PKCE code challenge"),
  code_challenge_method: z.enum(["S256", "plain"]).optional().describe("PKCE code challenge method"),
})

export const AuthorizeOutput = z.object({
  redirect_url: z.string().url().optional().describe("URL to redirect the user to"),
})

export const authorize = pikkuSessionlessFunc({
  description: "Handle OAuth authorization request with user approval/denial",
  input: AuthorizeInput,
  output: AuthorizeOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/oauth/authorize", data) as any
  },
})
