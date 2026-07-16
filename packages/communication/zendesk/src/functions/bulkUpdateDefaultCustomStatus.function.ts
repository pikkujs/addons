import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BulkUpdateDefaultCustomStatusInput = z.object({
  ids: z.string().optional().describe("The comma-separated list of custom ticket status ids to be set as default for their status categories"),
})

export const BulkUpdateDefaultCustomStatusOutput = z.record(z.string(), z.unknown())

export const bulkUpdateDefaultCustomStatus = pikkuSessionlessFunc({
  description: "Updates the default values for many custom ticket statuses at once.\n\n#### Allowed For\n\n* Admins",
  input: BulkUpdateDefaultCustomStatusInput,
  output: BulkUpdateDefaultCustomStatusOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/custom_status/default", data) as any
  },
})
