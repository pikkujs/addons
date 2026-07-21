import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CustomObjectRecordsLimitOutput = z.object({
  count: z.number().int().optional().describe("The current numnber of the requested resource"),
  limit: z.number().int().optional().describe("The maximum allowed number for the requested resource"),
})

export const customObjectRecordsLimit = pikkuSessionlessFunc({
  description: "List the current count and the limit for custom object records\n#### Allowed For\n* Agents",
  output: CustomObjectRecordsLimitOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/custom_objects/limits/record_limit") as any
  },
})
