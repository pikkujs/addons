import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListApprovalRequestsInput = z.object({
  "filter[status]": z.string().optional().describe("Filter by a comma-separated list of one or more approval statuses. Allowed values are active, approved, rejected, withdrawn. Maximum 100 values."),
  "filter[assignee_user_id]": z.string().optional().describe("Filter by a comma-separated list of assigned user ids. Maximum 100 ids."),
  "filter[assignee_group_id]": z.string().optional().describe("Filter by a comma-separated list of assigned group ids. Maximum 100 ids."),
  before_cursor: z.string().optional().describe("Cursor for pagination. Fetch records before this cursor"),
  after_cursor: z.string().optional().describe("Cursor for pagination. Fetch records after this cursor"),
})

export const ListApprovalRequestsOutput = z.object({
  approval_requests: z.array(z.object({
    assignee_group: z.object({
      id: z.number().int().optional().describe("Unique identifier for the assigned group"),
      name: z.string().optional().describe("Name of the assigned group"),
    }).nullable().optional(),
    assignee_user: z.object({
      id: z.number().int().optional().describe("Unique identifier for the assigned user"),
      name: z.string().optional().describe("Name of the assigned user"),
    }).nullable().optional(),
    clarification_flow_messages: z.array(z.object({
      author: z.object({
        avatar: z.string().optional().describe("URL for the author's avatar"),
        email: z.string().optional().describe("Email of the message author"),
        id: z.number().int().optional().describe("Unique identifier for the message author"),
        name: z.string().optional().describe("Name of the message author"),
        role: z.string().optional().describe("Role of the message author"),
      }).optional(),
      created_at: z.string().datetime().optional().describe("When the message was created"),
      id: z.string().optional().describe("Unique identifier for the message"),
      message: z.string().optional().describe("The message content"),
    })).optional().describe("List of clarification messages exchanged on this approval request"),
    created_at: z.string().datetime().optional().describe("The time the approval request was created"),
    created_by_user: z.object({
      id: z.number().int().optional().describe("Unique identifier for the user who created the approval request"),
      name: z.string().optional().describe("Name of the user who created the approval request"),
      photo: z.object({
        content_url: z.string().optional().describe("URL for the user's photo"),
      }).optional(),
    }).optional(),
    decided_at: z.string().datetime().nullable().optional().describe("The time when the approval request was responded to"),
    decisions: z.array(z.object({
      decided_at: z.string().datetime().optional().describe("The time when the response was made"),
      decided_by_user: z.object({
        id: z.number().int().optional().describe("Unique identifier for the user who responded"),
        name: z.string().optional().describe("Name of the user who responded"),
        photo: z.object({
          content_url: z.string().optional().describe("URL for the user's photo"),
        }).optional(),
      }).optional(),
      decision_notes: z.string().nullable().optional().describe("Notes provided with the decision"),
      origination_type: z.enum(["UI_ORIGINATION", "API_ORIGINATION", "SLACK_ORIGINATION", "ACTION_FLOW_ORIGINATION", "UNKNOWN_ORIGINATION"]).nullable().optional().describe("Source where the response was made"),
      status: z.string().optional().describe("The decision status. Allowed values: \"approved\", \"rejected\", or \"clarification_requested\""),
    })).optional().describe("List of responses made on this approval request"),
    id: z.string().optional().describe("Unique identifier for the approval request"),
    message: z.string().optional().describe("Details for the approval request"),
    origination_type: z.enum(["API_ORIGINATION", "UI_ORIGINATION", "TRIGGER_ORIGINATION", "DATA_IMPORTER_ORIGINATION", "TEMPLATE_ORIGINATION", "ACTION_FLOW_ORIGINATION", "UNKNOWN_ORIGINATION"]).nullable().optional().describe("Source where the approval request originated from"),
    status: z.string().optional().describe("Current status of the approval request (active, approved, rejected, withdrawn)"),
    subject: z.string().optional().describe("Subject for the approval request"),
    ticket_id: z.number().int().optional().describe("The id of the ticket associated with this approval request"),
    withdrawn_reason: z.string().nullable().optional().describe("Reason provided when the approval request was withdrawn"),
  })).optional(),
  links: z.object({
    next: z.string().nullable().optional().describe("Link to the next page of results"),
    prev: z.string().nullable().optional().describe("Link to the previous page of results"),
  }).optional().describe("Links for navigation"),
  meta: z.object({
    after_cursor: z.string().nullable().optional().describe("Cursor for fetching the next page of results"),
    before_cursor: z.string().nullable().optional().describe("Cursor for fetching the previous page of results"),
    has_more: z.boolean().optional().describe("Indicates if there are more results available"),
  }).optional().describe("Metadata about the response"),
}).describe("Response for listing approval requests with cursor pagination")

export const listApprovalRequests = pikkuSessionlessFunc({
  description: "Lists all approval requests for the current account with optional filtering by status and assignee.\n\n#### Allowed For\n\n* Admins\n\n#### Query Parameters\n\n| Name                      | Type   | Description\n|---------------------------|--------|--------------------------------------------------------------------------------------------\n| filter[status]            | string | Filter by a comma-separated list of one or more approval statuses. Values: active, approved, rejected, withdrawn\n| filter[assignee_user_id]  | string | Filter by a comma-separated list of assigned user ids. Maximum 100 ids\n| filter[assignee_group_id] | string | Filter by a comma-separated list of assigned group ids. Maximum 100 ids\n\n#### Filtering Logic\n\n- When multiple values are provided for a filter, `or` logic is used. For example, `filter[status]=active,approved` is evaluated as `status=active OR status=approved`.\n- If multiple filters are applied to a single request, `AND` logic is used. For example, `filter[status]=active AND filter[assignee_user_id]=123`.\n- Each filter parameter supports a maximum 100 values.\n- Numeric ids must be valid integers.\n\n#### Pagination\n\nThis endpoint supports cursor-based pagination. Use `after_cursor` and `before_cursor` parameters to navigate through results.",
  input: ListApprovalRequestsInput,
  output: ListApprovalRequestsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/approval_requests", data) as any
  },
})
