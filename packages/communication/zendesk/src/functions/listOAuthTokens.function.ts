// OAuth Tokens — OAuth tokens are credentials used to authenticate API requests on behalf of users or applications.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListOAuthTokensInput = z.object({
  client_id: z.number().int().optional().describe("The id of the OAuth client. Example: 223443"),
  global_client_id: z.number().int().optional().describe("The id of the global OAuth client. Example: 334556"),
  all: z.boolean().optional().describe("A boolean that returns all OAuth tokens in the account. Requires admin role. Example: true"),
  page: z.object({
  after: z.string().optional().describe("Cursor token for fetching next page"),
  before: z.string().optional().describe("Cursor token for fetching previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
}).optional().describe("Cursor-based pagination parameters (JSON:API style).\n\nSupports nested parameters:\n- `page[size]` - Number of records per page (default varies by endpoint, typically 100)\n- `page[after]` - Cursor token to fetch records after this position\n- `page[before]` - Cursor token to fetch records before this position\n\nExample: `?page[size]=50&page[after]=eyJvIjoiaWQiLCJ2IjoiYVFFPSJ9`\n"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
})

export const ListOAuthTokensOutput = z.object({
  tokens: z.array(z.object({
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
  })).optional(),
})

export const listOAuthTokens = pikkuSessionlessFunc({
  description: "Returns the properties of the tokens for the current user. Admins can view OAuth token properties for all users using the [all](/api-reference/ticketing/oauth/oauth_tokens/#parameters) parameter. To filter the list by OAuth client, use the [client_id](/api-reference/ticketing/oauth/oauth_tokens/#parameters) parameter for a local OAuth client ID, or the [global_client_id](/api-reference/ticketing/oauth/oauth_tokens/#parameters) parameter for a global OAuth client ID. For security reasons, only the first 10 characters of each access token are included.\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For\n\n* Admins",
  input: ListOAuthTokensInput,
  output: ListOAuthTokensOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/oauth/tokens", data) as any
  },
})
