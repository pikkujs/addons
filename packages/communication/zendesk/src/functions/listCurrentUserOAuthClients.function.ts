// OAuth Clients — OAuth clients represent third-party applications that access the Zendesk API on behalf of users.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListCurrentUserOAuthClientsOutput = z.object({
  clients: z.array(z.object({
    company: z.string().optional().describe("The company name displayed when users are asked to grant access to your application."),
    created_at: z.string().datetime().optional().describe("The time the client was created"),
    description: z.string().optional().describe("A short description of your client that is displayed to users when they are considering approving access to your application"),
    global: z.boolean().optional().describe("Whether this client is globally accessible. See [Set up a global OAuth client](/documentation/apps/publish-your-app-or-theme/global_oauth_intro/)"),
    id: z.number().int().optional().describe("Automatically assigned upon creation"),
    identifier: z.string().describe("The unique identifier for this client"),
    kind: z.string().optional().describe("Either \"public\" or \"confidential\". Specifies whether the OAuth client operates in a public environment where credentials cannot be securely stored, or on secure servers that can safely store credentials. See [Client types](/documentation/ticketing/working-with-oauth/oauth-pkce/#client-types)"),
    logo_url: z.string().optional().describe("The API logo url of this record"),
    name: z.string().describe("The name of this client"),
    redirect_uri: z.array(z.string()).optional().describe("An array of the valid redirect URIs for this client"),
    secret: z.string().optional().describe("The client secret. Generated automatically on creation and returned in full only at that time"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the client"),
    url: z.string().optional().describe("The API url of this record"),
    user_id: z.number().int().describe("The id of the admin who created the client"),
  })).optional(),
})

export const listCurrentUserOAuthClients = pikkuSessionlessFunc({
  description: "Returns the OAuth clients owned by the current user.\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For\n\n* Admins",
  output: ListCurrentUserOAuthClientsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/users/me/oauth/clients") as any
  },
})
