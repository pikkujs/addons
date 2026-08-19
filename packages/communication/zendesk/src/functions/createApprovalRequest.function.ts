import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnprocessableContentError } from '@pikku/core/errors'

export const CreateApprovalRequestInput = z.object({
  assignee_group_id: z.number().int().nullable().optional().describe("The id of the group assigned to review and approve the request"),
  assignee_user_id: z.number().int().nullable().optional().describe("The id of the user assigned to review and approve the request"),
  message: z.string().describe("Details and context for the approval request"),
  subject: z.string().describe("Subject line for the approval request"),
  ticket_id: z.number().int().describe("The id of the ticket the approval request was added to"),
})

export const CreateApprovalRequestOutput = z.object({
  approval_request: z.object({
    assignee_group_id: z.number().int().nullable().optional().describe("The id of the group assigned to review the request"),
    assignee_user_id: z.number().int().nullable().optional().describe("The id of the user assigned to review the request"),
    created_at: z.string().datetime().optional().describe("The time the approval request was created"),
    created_by_id: z.number().int().optional().describe("The id of the user who created the approval request"),
    id: z.string().optional().describe("Unique identifier for the approval request (ULID format)"),
    message: z.string().optional().describe("Details and context for the approval request"),
    origination_type: z.enum(["API_ORIGINATION", "UI_ORIGINATION", "TRIGGER_ORIGINATION", "DATA_IMPORTER_ORIGINATION", "TEMPLATE_ORIGINATION", "ACTION_FLOW_ORIGINATION", "UNKNOWN_ORIGINATION"]).nullable().optional().describe("How the approval request was created"),
    status: z.string().optional().describe("Current status of the approval request"),
    subject: z.string().optional().describe("Subject line for the approval request"),
    ticket_id: z.number().int().optional().describe("The id of the ticket this approval request is attached to"),
  }).optional(),
})

export const createApprovalRequest = pikkuSessionlessFunc({
  description: "Creates an approval request for a ticket.\n\nWhen manual approval requests are turned off for the account, approval requests can still be created through this API. Approval requests created by the API have a `Sent by` value of `API`.\n\n#### Allowed For\n\n* System users (flowstate)\n* Agents",
  input: CreateApprovalRequestInput,
  output: CreateApprovalRequestOutput,
  errors: [UnprocessableContentError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/approval_requests", data) as any
  },
})
