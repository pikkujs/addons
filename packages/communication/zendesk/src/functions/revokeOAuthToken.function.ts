// OAuth Tokens — OAuth tokens are credentials used to authenticate API requests on behalf of users or applications.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RevokeOAuthTokenInput = z.object({
  oauth_token_id: z.number().int().describe("The ID of the OAuth token. Example: 223443"),
})

export const revokeOAuthToken = pikkuSessionlessFunc({
  description: "#### Allowed for\n * Admins, Agents, End Users",
  input: RevokeOAuthTokenInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/oauth/tokens/{oauth_token_id}", data)
  },
})
