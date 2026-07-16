import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateAttributeValueInput = z.object({
  attribute_id: z.string().describe("The ID of the skill-based routing attribute. Example: \"6e279587-e930-11e8-a292-09cfcdea1b75\""),
  attribute_value_id: z.string().describe("The ID of the skill-based routing attribute value. Example: \"b376b35a-e38b-11e8-a292-e3b6377c5575\""),
})

export const UpdateAttributeValueOutput = z.object({
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

export const updateAttributeValue = pikkuSessionlessFunc({
  description: "Updates the name and ticket conditions of a skill. When a ticket is created, the skill is applied to a ticket  if the ticket meets the specified condition or conditions. See the [Conditions reference](/documentation/ticketing/reference-guides/conditions-reference/) for more information.\n\n#### Allowed For\n\n* Admins",
  input: UpdateAttributeValueInput,
  output: UpdateAttributeValueOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PATCH", "/api/v2/routing/attributes/{attribute_id}/values/{attribute_value_id}", data) as any
  },
})
