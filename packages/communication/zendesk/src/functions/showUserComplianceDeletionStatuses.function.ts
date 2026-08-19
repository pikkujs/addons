import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowUserComplianceDeletionStatusesInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
  application: z.string().optional().describe("Area of compliance. Example: \"chat\""),
})

export const ShowUserComplianceDeletionStatusesOutput = z.object({
  compliance_deletion_statuses: z.array(z.object({
    account_subdomain: z.string(),
    action: z.string(),
    application: z.string(),
    created_at: z.string(),
    executer_id: z.number().int().nullable(),
    user_id: z.number().int(),
  })).optional(),
})

export const showUserComplianceDeletionStatuses = pikkuSessionlessFunc({
  description: "Returns the GDPR status for each user per area of compliance. A Zendesk area of compliance is typically a product like \"support/explore\" but can be more fine-grained for areas within the product lines.\n\nIf the user is not in the account, the request returns a 404 status.\n\n```http\nStatus: 404\n{\n  \"error\":\"RecordNotFound\",\n  \"description\":\"Not found\"\n}\n```\n\n#### Allowed For\n\n* Agents, with restrictions\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).",
  input: ShowUserComplianceDeletionStatusesInput,
  output: ShowUserComplianceDeletionStatusesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/users/{user_id}/compliance_deletion_statuses", data) as any
  },
})
