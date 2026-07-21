import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListDeletedTicketsInput = z.object({
  sort_by: z.enum(["id", "subject", "deleted_at", "created_at", "updated_at", "status", "requester", "requester.name", "group", "assignee", "assignee.name"]).optional().describe("Sort by"),
  sort_order: z.enum(["asc", "desc"]).optional().describe("Sort order. Defaults to \"asc\""),
  support_type_scope: z.string().optional().describe("Lists tickets by support type. Possible values are \"all\", \"agent\", or \"ai_agent\". Defaults to \"agent\"\n"),
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Pagination parameter. Supports both traditional offset and cursor-based pagination:\n\n- Traditional: `?page=2` (integer page number)\n- Cursor: `?page[size]=50&page[after]=cursor` (deepObject with size, after, before)\n\nThese are mutually exclusive - use one format or the other, not both.\n"),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
})

export const ListDeletedTicketsOutput = z.object({
  deleted_tickets: z.array(z.object({
    actor: z.object({
      id: z.number().int().optional(),
      name: z.string().optional(),
    }).optional(),
    deleted_at: z.string().optional(),
    id: z.number().int().optional(),
    previous_state: z.string().optional(),
    subject: z.string().optional(),
  })).optional(),
  count: z.number().int().optional().describe("the total record count"),
  next_page: z.string().url().nullable().optional().describe("the URL of the next page"),
  previous_page: z.string().url().nullable().optional().describe("the URL of the previous page"),
})

export const listDeletedTickets = pikkuSessionlessFunc({
  description: "Returns a maximum of 100 deleted tickets per page. See [Pagination](/api-reference/introduction/pagination/).\n\nThe results includes all deleted (and not yet archived) tickets that\nhave not yet been [scrubbed](https://support.zendesk.com/hc/en-us/articles/4408845703194#topic_fv5_w51_sdb) in the past 30 days. Archived tickets are\nnot included in the results. See [About archived tickets](https://support.zendesk.com/hc/en-us/articles/4408887617050)\nin the Support Help Center.\n\nThe tickets are ordered chronologically by created date, from oldest to newest.\nThe first ticket listed may not be the oldest ticket in your\naccount due to [ticket archiving](https://support.zendesk.com/hc/en-us/articles/4408887617050).\n\n#### Pagination\n\n- Cursor pagination (recommended)\n- Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For\n\n* Agents\n\n#### Rate Limit\n\nYou can make 10 requests every 1 minute using this endpoint.\nWhen making requests beyond page 100, you can make 5 requests every 1 minute. These rate limits apply to both API calls and actions performed in the Admin Center.\nThe rate limiting mechanism behaves as described in\n[Monitoring your request activity](/api-reference/ticketing/account-configuration/usage_limits/#monitoring-your-request-activity) in the API introduction.",
  input: ListDeletedTicketsInput,
  output: ListDeletedTicketsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/deleted_tickets", data) as any
  },
})
