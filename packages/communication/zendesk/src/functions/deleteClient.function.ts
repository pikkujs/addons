// OAuth Clients — OAuth clients represent third-party applications that access the Zendesk API on behalf of users.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteClientInput = z.object({
  oauth_client_id: z.number().int().describe("The ID of the OAuth client. Example: 223443"),
})

export const deleteClient = pikkuSessionlessFunc({
  description: "#### Allowed for\n * Admins",
  input: DeleteClientInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/oauth/clients/{oauth_client_id}", data)
  },
})
