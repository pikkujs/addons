import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListAGentAttributeValuesInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const ListAGentAttributeValuesOutput = z.object({
  attribute_values: z.array(z.object({
    agent_skill_priority: z.enum(["NORMAL", "HIGH"]).optional().describe("The priority of the agent skill for this attribute value"),
    attribute_id: z.string().optional().describe("Id of the associated attribute"),
    created_at: z.string().datetime().optional().describe("When this record was created"),
    id: z.string().optional().describe("Automatically assigned when an attribute value is created"),
    name: z.string().optional().describe("The name of the attribute value"),
    updated_at: z.string().datetime().optional().describe("When this record was last updated"),
    url: z.string().optional().describe("URL of the attribute value"),
  })).optional(),
})

export const listAGentAttributeValues = pikkuSessionlessFunc({
  description: "Returns an attribute value.\n\n#### Allowed For\n\n* Agents and admins",
  input: ListAGentAttributeValuesInput,
  output: ListAGentAttributeValuesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/routing/agents/{user_id}/instance_values", data) as any
  },
})
