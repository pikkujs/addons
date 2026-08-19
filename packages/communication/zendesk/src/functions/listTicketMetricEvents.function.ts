import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListTicketMetricEventsInput = z.object({
  start_time: z.number().int().describe("The Unix UTC epoch time of the oldest event you're interested in. Example: 1332034771.. Example: 1332034771"),
  include_changes: z.boolean().optional().describe("This optional parameter enhances incremental data retrieval, delivering a consistent and accurate representation of data changes."),
  exclude_deleted: z.boolean().optional().describe("When true, excludes ticket metric events for deleted tickets. Use this to avoid\nreceiving events for tickets that are deleted."),
})

export const ListTicketMetricEventsOutput = z.object({
  ticket_metric_events: z.array(z.object({
    deleted: z.boolean().optional().describe("If true, the event has been deleted"),
    id: z.number().int().optional().describe("Automatically assigned when the record is created"),
    instance_id: z.number().int().optional().describe("The instance of the metric associated with the event. See [instance_id](#instance_id)"),
    metric: z.enum(["agent_work_time", "pausable_update_time", "periodic_update_time", "reply_time", "requester_wait_time", "resolution_time", "group_ownership_time"]).optional().describe("The metric being tracked"),
    ticket_id: z.number().int().optional().describe("Id of the associated ticket"),
    time: z.string().datetime().optional().describe("The time the event occurred"),
    type: z.enum(["activate", "pause", "fulfill", "apply_sla", "apply_group_sla", "breach", "update_status", "measure"]).optional().describe("The type of the metric event. See [Ticket metric event types reference](/documentation/ticketing/reference-guides/ticket-metric-event-types-reference)"),
  })).optional(),
  count: z.number().int().optional(),
  end_time: z.number().int().optional(),
  next_page: z.string().optional(),
})

export const listTicketMetricEvents = pikkuSessionlessFunc({
  description: "Returns ticket metric events that occurred on or after the start time.\n\nCursor pagination returns a maximum of 100 records per page. Events are listed in chronological order.\n\nIf the results are not paginated, events will be returned as a time-based incremental export.\n\nSee [Time-based incremental exports](/documentation/ticketing/managing-tickets/using-the-incremental-export-api#time-based-incremental-exports).\n\n#### Pagination\n* Cursor pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\n#### Allowed For\n\n* Admins",
  input: ListTicketMetricEventsInput,
  output: ListTicketMetricEventsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/incremental/ticket_metric_events", data) as any
  },
})
