import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateRequestOutput = z.object({
  request: z.object({
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
  }).optional(),
})

export const createRequest = pikkuSessionlessFunc({
  description: "Accepts a `request` object that sets one or more properties.\n\n#### Allowed for\n\n* End users\n* Anonymous users (rate limit of 5 requests per hour for [trial accounts](/documentation/developer-tools/getting-started/getting-a-trial-or-sponsored-account-for-development/))\n\n#### Additional properties\n\nIn addition to the writable request properties in the [JSON Format table](#json-format) above, you can set the following properties when creating a request.\n\n| Name                | Type   | Mandatory | Comment\n| ----------------    | -------| --------- | -------\n| comment             | object | yes       | Describes the problem, incident, question, or task. See [Request comments](#request-comments)\n| collaborators       | array  | no        | Adds collaborators (cc's) to the request. An email notification is sent to them when the ticket is created. See [Setting collaborators](/documentation/ticketing/managing-tickets/creating-and-managing-requests#setting-collaborators)\n| requester           | object | yes*      | \\*Required for anonymous requests. Specifies the requester of the anonymous request. See [Creating anonymous requests](/documentation/ticketing/managing-tickets/creating-and-managing-requests#creating-anonymous-requests)\n\n#### Creating follow-up requests\n\nOnce a ticket is closed (as distinct from solved), it can't be reopened. However, you can create a new request that references the closed ticket. To create the follow-up request, include a `via_followup_source_id` property in the `request` object that specifies the closed ticket. The parameter only works with closed tickets. It has no effect with other tickets.",
  output: CreateRequestOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("POST", "/api/v2/requests") as any
  },
})
