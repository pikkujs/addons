// OAuth Tokens — OAuth tokens are credentials used to authenticate API requests on behalf of users or applications.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowCurrentTokenOutput = z.object({
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

export const showCurrentToken = pikkuSessionlessFunc({
  description: "Returns the properties of the current token. Include an `Authorization: Bearer` header with the full token to get its associated properties.\n\nFor security reasons, only the first 10 characters of the access token are included.\n\n#### Allowed for\n\n* Admins, Agents, End Users",
  output: ShowCurrentTokenOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/oauth/tokens/current") as any
  },
})
