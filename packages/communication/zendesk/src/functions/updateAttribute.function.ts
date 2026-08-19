import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UpdateAttributeInput = z.object({
  attribute_id: z.string().describe("The ID of the skill-based routing attribute. Example: \"6e279587-e930-11e8-a292-09cfcdea1b75\""),
})

export const UpdateAttributeOutput = z.object({
  attribute: z.object({
    created_at: z.string().datetime().optional().describe("When this record was created"),
    id: z.string().optional().describe("Automatically assigned when an attribute is created"),
    name: z.string().describe("The name of the attribute"),
    updated_at: z.string().datetime().optional().describe("When this record was last updated"),
    url: z.string().optional().describe("URL of the attribute"),
  }).optional(),
})

export const updateAttribute = pikkuSessionlessFunc({
  description: "Updates an attribute.\n\n#### Allowed For\n\n* Admins",
  input: UpdateAttributeInput,
  output: UpdateAttributeOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/routing/attributes/{attribute_id}", data) as any
  },
})
