import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateAttributeValueInput = z.object({
  attribute_id: z.string().describe("The ID of the skill-based routing attribute. Example: \"6e279587-e930-11e8-a292-09cfcdea1b75\""),
})

export const CreateAttributeValueOutput = z.object({
  attribute_value: z.object({
    agent_skill_priority: z.enum(["NORMAL", "HIGH"]).optional().describe("The priority of the agent skill for this attribute value"),
    attribute_id: z.string().optional().describe("Id of the associated attribute"),
    created_at: z.string().datetime().optional().describe("When this record was created"),
    id: z.string().optional().describe("Automatically assigned when an attribute value is created"),
    name: z.string().optional().describe("The name of the attribute value"),
    updated_at: z.string().datetime().optional().describe("When this record was last updated"),
    url: z.string().optional().describe("URL of the attribute value"),
  }).optional(),
})

export const createAttributeValue = pikkuSessionlessFunc({
  description: "Creates an attribute value.\n\n#### Allowed For\n\n* Admins",
  input: CreateAttributeValueInput,
  output: CreateAttributeValueOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/routing/attributes/{attribute_id}/values", data) as any
  },
})
