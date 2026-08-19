// OAuth Tokens — OAuth tokens are credentials used to authenticate API requests on behalf of users or applications.

import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const revokeCurrentOAuthToken = pikkuSessionlessFunc({
  description: "Revokes the current OAuth token. Include an `Authorization: Bearer` header with the full token.\n\n#### Allowed for\n\n* Admins, Agents, End Users",
  func: async ({ zendesk }) => {
    return zendesk.call("DELETE", "/api/v2/oauth/tokens/current")
  },
})
