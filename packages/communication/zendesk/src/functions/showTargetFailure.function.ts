import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowTargetFailureInput = z.object({
  target_failure_id: z.number().int().describe("The ID of the target failure. Example: 1"),
})

export const ShowTargetFailureOutput = z.object({
  target_failure: z.object({
    consecutive_failure_count: z.number().int().optional().describe("Number of times the target failed consecutively"),
    created_at: z.string().datetime().optional().describe("Time of the failure"),
    id: z.number().int().optional().describe("The ID of the target failure"),
    raw_request: z.string().optional().describe("The raw message of the target request"),
    raw_response: z.string().optional().describe("The raw response of the failure"),
    status_code: z.number().int().optional().describe("HTTP status code of the target failure"),
    target_name: z.string().optional().describe("Name of the target failure"),
    url: z.string().optional().describe("The API url of the failure record"),
  }).optional(),
})

export const showTargetFailure = pikkuSessionlessFunc({
  description: "#### Stability\n\n* Development\n\n#### Allowed For\n\n* Admins",
  input: ShowTargetFailureInput,
  output: ShowTargetFailureOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/target_failures/{target_failure_id}", data) as any
  },
})
