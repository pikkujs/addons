// OAuth Tokens — OAuth tokens are credentials used to authenticate API requests on behalf of users or applications.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowTokenInput = z.object({
  oauth_token_id: z.number().int().describe("The ID of the OAuth token. Example: 223443"),
})

export const ShowTokenOutput = z.object({
  token: z.object({
    client_id: z.number().int().optional().describe("The id of the client this token belongs to"),
    created_at: z.string().datetime().optional().describe("The time the token was created"),
    expires_at: z.string().datetime().optional().describe("The time the token will expire"),
    id: z.number().int().optional().describe("Automatically assigned upon creation"),
    refresh_token: z.string().optional().describe("The refresh token, if generated"),
    refresh_token_expires_at: z.string().datetime().optional().describe("The time the refresh token will expire"),
    scopes: z.array(z.string()).optional().describe("An array of the valid scopes for this token. See [Scopes](#scopes) below"),
    token: z.string().optional().describe("The access token"),
    url: z.string().optional().describe("The API url of this record"),
    used_at: z.string().datetime().optional().describe("The latest time this token was used for authentication"),
    user_id: z.number().int().optional().describe("The id of the user this token authenticates as"),
  }).optional(),
})

export const showToken = pikkuSessionlessFunc({
  description: "Returns the properties of the specified token. For security reasons, only the first 10 characters of the access token are included.\n\nIn the first endpoint, `id` is a token id, not the full token.\n\nIn the second endpoint, include an `Authorization: Bearer` header with the full token to get its associated properties. Example:\n\n```sh\ncurl https://{subdomain}.zendesk.com/api/v2/oauth/tokens/current \\\n  -H 'Authorization: Bearer ${authToken}' \\\n  -v -u {email_address}/token:{api_token}\n```\n\n#### Allowed for\n\n* Admins, Agents, End Users",
  input: ShowTokenInput,
  output: ShowTokenOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/oauth/tokens/{oauth_token_id}", data) as any
  },
})
