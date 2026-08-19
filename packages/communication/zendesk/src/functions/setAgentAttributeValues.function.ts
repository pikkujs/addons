import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SetAgentAttributeValuesInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const SetAgentAttributeValuesOutput = z.object({
  attribute_values: z.array(z.object({
    attribute_id: z.string().optional().describe("Id of the associated attribute"),
    created_at: z.string().datetime().optional().describe("When this record was created"),
    id: z.string().optional().describe("Automatically assigned when an attribute value is created"),
    name: z.string().optional().describe("The name of the attribute value"),
    updated_at: z.string().datetime().optional().describe("When this record was last updated"),
    url: z.string().optional().describe("URL of the attribute value"),
  })).optional(),
})

export const setAgentAttributeValues = pikkuSessionlessFunc({
  description: "Adds the specified attributes if no attributes exists, or replaces all existing attributes with the specified attributes.\n\n#### Allowed For\n\n* Admins",
  input: SetAgentAttributeValuesInput,
  output: SetAgentAttributeValuesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/routing/agents/{user_id}/instance_values", data) as any
  },
})
