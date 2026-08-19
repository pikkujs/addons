import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomObjectsLimitOutput = z.object({
  count: z.number().int().optional().describe("The current numnber of the requested resource"),
  limit: z.number().int().optional().describe("The maximum allowed number for the requested resource"),
})

export const customObjectsLimit = pikkuSessionlessFunc({
  description: "List the current count and the limit for custom objects\n#### Allowed For\n* Admins",
  output: CustomObjectsLimitOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/custom_objects/limits/object_limit") as any
  },
})
