import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowAttributeInput = z.object({
  attribute_id: z.string().describe("The ID of the skill-based routing attribute. Example: \"6e279587-e930-11e8-a292-09cfcdea1b75\""),
})

export const ShowAttributeOutput = z.object({
  attribute: z.object({
    created_at: z.string().datetime().optional().describe("When this record was created"),
    id: z.string().optional().describe("Automatically assigned when an attribute is created"),
    name: z.string().describe("The name of the attribute"),
    updated_at: z.string().datetime().optional().describe("When this record was last updated"),
    url: z.string().optional().describe("URL of the attribute"),
  }).optional(),
})

export const showAttribute = pikkuSessionlessFunc({
  description: "Returns an attribute.\n\n#### Allowed For\n\n* Admins",
  input: ShowAttributeInput,
  output: ShowAttributeOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/routing/attributes/{attribute_id}", data) as any
  },
})
