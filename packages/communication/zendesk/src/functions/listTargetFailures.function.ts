import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListTargetFailuresOutput = z.object({
  target_failures: z.array(z.object({
    consecutive_failure_count: z.number().int().optional().describe("Number of times the target failed consecutively"),
    created_at: z.string().datetime().optional().describe("Time of the failure"),
    id: z.number().int().optional().describe("The ID of the target failure"),
    raw_request: z.string().optional().describe("The raw message of the target request"),
    raw_response: z.string().optional().describe("The raw response of the failure"),
    status_code: z.number().int().optional().describe("HTTP status code of the target failure"),
    target_name: z.string().optional().describe("Name of the target failure"),
    url: z.string().optional().describe("The API url of the failure record"),
  })).optional(),
})

export const listTargetFailures = pikkuSessionlessFunc({
  description: "Returns the 25 most recent target failures, per target.\n\n#### Stability\n\n* Development\n\n#### Allowed For\n\n* Admins",
  output: ListTargetFailuresOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/target_failures") as any
  },
})
