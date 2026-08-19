import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListSessionsInput = z.object({
  page: z.object({
  after: z.string().optional().describe("Cursor token for fetching next page"),
  before: z.string().optional().describe("Cursor token for fetching previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
}).optional().describe("Cursor-based pagination parameters (JSON:API style).\n\nSupports nested parameters:\n- `page[size]` - Number of records per page (default varies by endpoint, typically 100)\n- `page[after]` - Cursor token to fetch records after this position\n- `page[before]` - Cursor token to fetch records before this position\n\nExample: `?page[size]=50&page[after]=eyJvIjoiaWQiLCJ2IjoiYVFFPSJ9`\n"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
})

export const ListSessionsOutput = z.object({
  sessions: z.array(z.object({
    authenticated_at: z.string().nullable().optional().describe("When the session was created"),
    id: z.number().int().describe("Automatically assigned when the session is created"),
    last_seen_at: z.string().nullable().optional().describe("The last approximate time this session was seen. This does not update on every request."),
    url: z.string().nullable().optional().describe("The API URL of this session"),
    user_id: z.number().int().nullable().optional().describe("The id of the user"),
  })).optional(),
})

export const listSessions = pikkuSessionlessFunc({
  description: "If authenticated as an admin, returns all the account's sessions. If authenticated as an agent or end user, returns only the sessions of the user making the request.\n\n#### Pagination\n\n- Cursor pagination only\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\n#### Allowed For\n\n* Admins, Agents, End users",
  input: ListSessionsInput,
  output: ListSessionsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/sessions", data) as any
  },
})
