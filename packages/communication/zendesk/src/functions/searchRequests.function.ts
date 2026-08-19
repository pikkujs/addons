import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SearchRequestsInput = z.object({
  query: z.string().optional().describe("The syntax and matching logic for the string is detailed in the [Zendesk Support search reference](https://support.zendesk.com/hc/en-us/articles/4408886879258). See also [Query basics](/api-reference/ticketing/ticket-management/search/#query-basics) in the Tickets API doc."),
})

export const SearchRequestsOutput = z.object({
  requests: z.array(z.object({
    assignee_id: z.number().int().optional().describe("The id of the assignee if the field is visible to end users"),
    can_be_solved_by_me: z.boolean().optional().describe("If true, an end user can mark the request as solved. See [Update Request](/api-reference/ticketing/tickets/ticket-requests/#update-request)"),
    collaborator_ids: z.array(z.number().int()).optional().describe("The ids of users currently CC'ed on the ticket"),
    created_at: z.string().datetime().optional().describe("When this record was created"),
    custom_fields: z.array(z.object({
      id: z.number().int().optional(),
      value: z.string().optional(),
    })).optional().describe("Custom fields for the request. See [Setting custom field values](/api-reference/ticketing/tickets/tickets/#setting-custom-field-values) in the Tickets doc"),
    custom_status_id: z.number().int().optional().describe("The custom ticket status id of the ticket"),
    description: z.string().optional().describe("Read-only first comment on the request. When [creating a request](#create-request), use `comment` to set the description"),
    due_at: z.string().datetime().optional().describe("When the task is due (only applies if the request is of type \"task\")"),
    email_cc_ids: z.array(z.number().int()).optional().describe("The ids of users who are currently email CCs on the ticket. See [CCs and followers resources](https://support.zendesk.com/hc/en-us/articles/4408822451482) in the Support Help Center"),
    followup_source_id: z.number().int().optional().describe("The id of the original ticket if this request is a follow-up ticket. See [Create Request](#create-request)"),
    group_id: z.number().int().optional().describe("The id of the assigned group if the field is visible to end users"),
    id: z.number().int().optional().describe("Automatically assigned when creating requests"),
    is_public: z.boolean().optional().describe("Is true if any comments are public, false otherwise"),
    organization_id: z.number().int().optional().describe("The organization of the requester"),
    priority: z.string().optional().describe("The priority of the request, \"low\", \"normal\", \"high\", \"urgent\""),
    recipient: z.string().optional().describe("The original recipient e-mail address of the request"),
    requester_id: z.number().int().optional().describe("The id of the requester"),
    solved: z.boolean().optional().describe("Whether or not request is solved (an end user can set this if \"can_be_solved_by_me\", above, is true for that user)"),
    status: z.string().optional().describe("The state of the request, \"new\", \"open\", \"pending\", \"hold\", \"solved\", \"closed\""),
    subject: z.string().describe("The value of the subject field for this request if the subject field is visible to end users; a truncated version of the description otherwise"),
    ticket_form_id: z.number().int().optional().describe("The numeric id of the ticket form associated with this request if the form is visible to end users - only applicable for enterprise accounts"),
    type: z.string().optional().describe("The type of the request, \"question\", \"incident\", \"problem\", \"task\""),
    updated_at: z.string().datetime().optional().describe("When this record last got updated"),
    url: z.string().optional().describe("The API url of this request"),
    via: z.object({
      channel: z.string().optional().describe("This tells you how the ticket or event was created. Examples: \"web\", \"mobile\", \"rule\", \"system\""),
      source: z.record(z.string(), z.unknown()).optional().describe("For some channels a source object gives more information about how or why the ticket or event was created"),
    }).optional().describe("Describes how the object was created. See the [Via object reference](/documentation/ticketing/reference-guides/via-object-reference)"),
  })).optional(),
})

export const searchRequests = pikkuSessionlessFunc({
  description: "Examples:\n\n* `GET /api/v2/requests/search?query=printer`\n* `GET /api/v2/requests/search?query=printer&organization_id=1`\n* `GET /api/v2/requests/search?query=printer&cc_id=true`\n* `GET /api/v2/requests/search?query=printer&status=hold,open`\n\n#### Pagination\n\n* Offset pagination only\n\nSee [Using Offset Pagination](/api-reference/introduction/pagination/#using-offset-pagination).\n\n#### Results limit\n\nThe Search Requests endpoint returns up to 1,000 results per query, with a maximum of 100 results per page. See [Pagination](/api-reference/ticketing/introduction/#pagination). If you request a page past the limit (`page=11` at 100 results per page), a 422 Insufficient Resource Error is returned.\n\n#### Allowed For\n\n* End Users",
  input: SearchRequestsInput,
  output: SearchRequestsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/requests/search", data) as any
  },
})
