import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IncrementalTicketEventsInput = z.object({
  start_time: z.number().int().describe("The time to start the incremental export from. Must be at least one minute in the past. Data isn't provided for the most recent minute. Example: 1332034771"),
  support_type_scope: z.string().optional().describe("Lists tickets by support type. Possible values are \"all\", \"agent\", or \"ai_agent\". Defaults to \"agent\"\n"),
  include: z.string().optional().describe("Sideloads to include in the response. Accepts a comma-separated list of values.\nSupports `comment_events` to include full comment data in the response.\n. Example: \"comment_events\""),
})

export const IncrementalTicketEventsOutput = z.object({
  count: z.number().int().optional(),
  end_of_stream: z.boolean().optional(),
  end_time: z.number().int().optional(),
  next_page: z.string().nullable().optional(),
  ticket_events: z.array(z.object({
    deleted: z.boolean().optional().describe("If true, the event has been deleted"),
    id: z.number().int().optional().describe("Automatically assigned when the record is created"),
    instance_id: z.number().int().optional().describe("The instance of the metric associated with the event. See [instance_id](#instance_id)"),
    metric: z.enum(["agent_work_time", "pausable_update_time", "periodic_update_time", "reply_time", "requester_wait_time", "resolution_time", "group_ownership_time"]).optional().describe("The metric being tracked"),
    ticket_id: z.number().int().optional().describe("Id of the associated ticket"),
    time: z.string().datetime().optional().describe("The time the event occurred"),
    type: z.enum(["activate", "pause", "fulfill", "apply_sla", "apply_group_sla", "breach", "update_status", "measure"]).optional().describe("The type of the metric event. See [Ticket metric event types reference](/documentation/ticketing/reference-guides/ticket-metric-event-types-reference)"),
  })).optional(),
})

export const incrementalTicketEvents = pikkuSessionlessFunc({
  description: "Returns a stream of changes that occurred on tickets, excluding events occuring within one minute of the request. Each event is tied\nto an update on a ticket and contains all the fields that were updated in that\nchange. For more information, see:\n\n- [Exporting ticket events](/documentation/ticketing/managing-tickets/using-the-incremental-export-api#exporting-ticket-events) in [Using the Incremental Exports API](/documentation/ticketing/managing-tickets/using-the-incremental-export-api)\n- [Time-based incremental exports](/documentation/ticketing/managing-tickets/using-the-incremental-export-api#time-based-incremental-exports) in [Using the Incremental Exports API](/documentation/ticketing/managing-tickets/using-the-incremental-export-api)\n\nYou can include comments in the event stream by using the `comment_events`\nsideload. See Sideloading below. If you don't specify the sideload, any comment\npresent in the ticket update is described only by Boolean `comment_present`\nand `comment_public` object properties in the event's `child_events` array.\nThe comment itself is not included.\n\n#### Allowed For\n\n * Admins\n\n#### Sideloading\n\nThe endpoint supports the `comment_events` sideload. Any comment present in the ticket\nupdate is listed as an object in the event's `child_events` array. Example:\n\n```js\n\"child_events\": [\n  {\n    \"id\": 91048994488,\n    \"via\": {\n      \"channel\": \"api\",\n      \"source\": {\"from\":{},\"to\":{},\"rel\":null}},\n    \"via_reference_id\":null,\n    \"type\": \"Comment\",\n    \"author_id\": 5031726587,\n    \"body\": \"This is a comment\",\n    \"html_body\": \"&lt;div class=\"zd-comment\"&gt;&lt;p dir=\"auto\"&gt;This is a comment&lt;/p&gt;\",\n    \"public\": true,\n    \"attachments\": [],\n    \"audit_id\": 91048994468,\n    \"created_at\": \"2009-06-25T10:15:18Z\",\n    \"event_type\": \"Comment\"\n  },\n  ...\n],\n...\n```",
  input: IncrementalTicketEventsInput,
  output: IncrementalTicketEventsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/incremental/ticket_events", data) as any
  },
})
