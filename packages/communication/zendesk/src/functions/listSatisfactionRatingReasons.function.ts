import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListSatisfactionRatingReasonsOutput = z.object({
  reasons: z.array(z.object({
    created_at: z.string().datetime().optional().describe("The time the reason was created"),
    deleted_at: z.string().datetime().optional().describe("The time the reason was deleted"),
    id: z.number().int().optional().describe("Automatically assigned upon creation"),
    raw_value: z.string().optional().describe("The dynamic content placeholder, if present, or the current \"value\", if not. See [Dynamic Content Items](/api-reference/ticketing/ticket-management/dynamic_content/)"),
    reason_code: z.number().int().optional().describe("An account-level code for referencing the reason. Custom reasons are assigned an auto-incrementing integer (non-system reason codes begin at 1000). See [Reason codes](#reason-codes)"),
    updated_at: z.string().datetime().optional().describe("The time the reason was updated"),
    url: z.string().optional().describe("API URL for the resource"),
    value: z.string().describe("Translated value of the reason in the account locale"),
  })).optional(),
})

export const listSatisfactionRatingReasons = pikkuSessionlessFunc({
  description: "List all reasons for an account\n\n#### Allowed For\n\n* Admins",
  output: ListSatisfactionRatingReasonsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/satisfaction_reasons") as any
  },
})
