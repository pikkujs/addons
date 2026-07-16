import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListTicketMetricsInput = z.object({
  page: z.object({
  after: z.string().optional().describe("Cursor token for fetching next page"),
  before: z.string().optional().describe("Cursor token for fetching previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
}).optional().describe("Cursor-based pagination parameters (JSON:API style).\n\nSupports nested parameters:\n- `page[size]` - Number of records per page (default varies by endpoint, typically 100)\n- `page[after]` - Cursor token to fetch records after this position\n- `page[before]` - Cursor token to fetch records before this position\n\nExample: `?page[size]=50&page[after]=eyJvIjoiaWQiLCJ2IjoiYVFFPSJ9`\n"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
})

export const ListTicketMetricsOutput = z.object({
  ticket_metrics: z.array(z.object({
    agent_wait_time_in_minutes: z.object({
      business: z.number().int().optional().describe("Time in business hours"),
      calendar: z.number().int().optional().describe("Time in calendar hours"),
    }).optional().describe("Number of minutes the agent spent waiting during calendar and business hours"),
    assigned_at: z.string().datetime().optional().describe("When the ticket was assigned"),
    assignee_stations: z.number().int().optional().describe("Number of assignees the ticket had"),
    assignee_updated_at: z.string().datetime().optional().describe("When the assignee last updated the ticket"),
    created_at: z.string().datetime().optional().describe("When the record was created"),
    custom_status_updated_at: z.string().datetime().optional().describe("The date and time the ticket's custom status was last updated"),
    first_resolution_time_in_minutes: z.object({
      business: z.number().int().optional().describe("Time in business hours"),
      calendar: z.number().int().optional().describe("Time in calendar hours"),
    }).optional().describe("Number of minutes to the first resolution time during calendar and business hours"),
    full_resolution_time_in_minutes: z.object({
      business: z.number().int().optional().describe("Time in business hours"),
      calendar: z.number().int().optional().describe("Time in calendar hours"),
    }).optional().describe("Number of minutes to the full resolution during calendar and business hours"),
    group_stations: z.number().int().optional().describe("Number of groups the ticket passed through"),
    id: z.number().int().optional().describe("Automatically assigned when the client is created"),
    initially_assigned_at: z.string().datetime().optional().describe("When the ticket was initially assigned"),
    latest_comment_added_at: z.string().datetime().optional().describe("When the latest comment was added"),
    on_hold_time_in_minutes: z.object({
      business: z.number().int().optional().describe("Time in business hours"),
      calendar: z.number().int().optional().describe("Time in calendar hours"),
    }).optional().describe("Number of minutes on hold"),
    reopens: z.number().int().optional().describe("Total number of times the ticket was reopened"),
    replies: z.number().int().optional().describe("The number of public replies added to a ticket by an agent"),
    reply_time_in_minutes: z.object({
      business: z.number().int().optional().describe("Time in business hours"),
      calendar: z.number().int().optional().describe("Time in calendar hours"),
    }).optional().describe("Number of minutes to the first reply during calendar and business hours"),
    reply_time_in_seconds: z.object({
      business: z.number().int().optional().describe("Time in business hours"),
      calendar: z.number().int().optional().describe("Time in calendar hours"),
    }).optional().describe("Number of seconds to the first reply during calendar hours, only available for Messaging tickets"),
    requester_updated_at: z.string().datetime().optional().describe("When the requester last updated the ticket"),
    requester_wait_time_in_minutes: z.object({
      business: z.number().int().optional().describe("Time in business hours"),
      calendar: z.number().int().optional().describe("Time in calendar hours"),
    }).optional().describe("Number of minutes the requester spent waiting during calendar and business hours"),
    solved_at: z.string().datetime().optional().describe("When the ticket was solved"),
    status_updated_at: z.string().datetime().optional().describe("When the status of the ticket was last updated"),
    ticket_id: z.number().int().optional().describe("Id of the associated ticket"),
    updated_at: z.string().datetime().optional().describe("When the record was last updated"),
    url: z.string().optional().describe("The API url of the ticket metric"),
  })).optional(),
})

export const listTicketMetrics = pikkuSessionlessFunc({
  description: "Returns a list of tickets with their metrics.\n\nTickets are ordered chronologically by created date, from newest to oldest.\nThe last ticket listed may not be the absolute oldest ticket in your account\ndue to ticket archiving.\n\nArchived tickets are not included in the response. See\n[About archived tickets](https://support.zendesk.com/hc/en-us/articles/4408887617050) in\nZendesk help.\n\n#### Pagination\n\n- Cursor pagination (recommended)\n- Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n\n#### Allowed For\n\n* Agents",
  input: ListTicketMetricsInput,
  output: ListTicketMetricsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/ticket_metrics", data) as any
  },
})
