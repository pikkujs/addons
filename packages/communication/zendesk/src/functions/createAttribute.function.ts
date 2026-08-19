import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateAttributeOutput = z.object({
  attribute: z.object({
    created_at: z.string().datetime().optional().describe("When this record was created"),
    id: z.string().optional().describe("Automatically assigned when an attribute is created"),
    name: z.string().describe("The name of the attribute"),
    updated_at: z.string().datetime().optional().describe("When this record was last updated"),
    url: z.string().optional().describe("URL of the attribute"),
  }).optional(),
})

export const createAttribute = pikkuSessionlessFunc({
  description: "Creates an attribute.\n\n#### Allowed For\n\n* Agents",
  output: CreateAttributeOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("POST", "/api/v2/routing/attributes") as any
  },
})
