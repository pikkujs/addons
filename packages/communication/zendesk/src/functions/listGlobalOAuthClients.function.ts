import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListGlobalOAuthClientsInput = z.object({
  page: z.object({
  after: z.string().optional().describe("Cursor token for fetching next page"),
  before: z.string().optional().describe("Cursor token for fetching previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
}).optional().describe("Cursor-based pagination parameters (JSON:API style).\n\nSupports nested parameters:\n- `page[size]` - Number of records per page (default varies by endpoint, typically 100)\n- `page[after]` - Cursor token to fetch records after this position\n- `page[before]` - Cursor token to fetch records before this position\n\nExample: `?page[size]=50&page[after]=eyJvIjoiaWQiLCJ2IjoiYVFFPSJ9`\n"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
})

export const ListGlobalOAuthClientsOutput = z.object({
  global_clients: z.array(z.object({
    company: z.string().optional().describe("The company that users are asked to approve access to"),
    description: z.string().optional().describe("A short description of the client"),
    id: z.number().int().optional().describe("Automatically assigned when the client is created"),
    identifier: z.string().optional().describe("The unique identifier for the client"),
    kind: z.string().optional().describe("The kind of client, public or confidential"),
    logo_url: z.string().optional().describe("The API logo url of this record"),
    name: z.string().optional().describe("The name of the client"),
  })).optional(),
})

export const listGlobalOAuthClients = pikkuSessionlessFunc({
  description: "Returns all the global OAuth clients that users on your account have authorized.\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For\n\n* Admins\n* Agents with the `manage_api_credentials` permission (when enabled for the account)",
  input: ListGlobalOAuthClientsInput,
  output: ListGlobalOAuthClientsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/oauth/global_clients", data) as any
  },
})
