import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowSatisfactionRatingsInput = z.object({
  satisfaction_reason_id: z.number().int().describe("The id of the satisfaction rating reason. Example: 35121"),
})

export const ShowSatisfactionRatingsOutput = z.object({
  reason: z.array(z.object({
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

export const showSatisfactionRatings = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins",
  input: ShowSatisfactionRatingsInput,
  output: ShowSatisfactionRatingsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/satisfaction_reasons/{satisfaction_reason_id}", data) as any
  },
})
