import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GlobalOAuthClientsTokenSummaryInput = z.object({
  global_client_id: z.number().int().optional().describe("The id of the global OAuth client. Example: 334556"),
  include_expired: z.boolean().optional().describe("If true, includes expired tokens in summary. Example: true"),
})

export const GlobalOAuthClientsTokenSummaryOutput = z.object({
  global_clients: z.array(z.object({
    id: z.number().int().optional().describe("Automatically assigned when the client is created"),
    last_used_at: z.string().optional().describe("Date and time in ISO 8601 format of last token usage for a client"),
    tokens_count: z.number().int().optional().describe("Account tokens count for client"),
  })).optional(),
})

export const globalOAuthClientsTokenSummary = pikkuSessionlessFunc({
  description: "Returns information about tokens for the global clients that your account has authorized.\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For\n\n* Admins\n* Agents with the `manage_api_credentials` permission (when enabled for the account)",
  input: GlobalOAuthClientsTokenSummaryInput,
  output: GlobalOAuthClientsTokenSummaryOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/oauth/global_clients/token_summary", data) as any
  },
})
