import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowTicketMetricsByTicketInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const ShowTicketMetricsByTicketOutput = z.object({
  ticket_metric: z.array(z.object({
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

export const showTicketMetricsByTicket = pikkuSessionlessFunc({
  description: "Returns the metrics for a specific ticket.\n\n#### Allowed For\n\n* Agents",
  input: ShowTicketMetricsByTicketInput,
  output: ShowTicketMetricsByTicketOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/tickets/{ticket_id}/metrics", data) as any
  },
})
