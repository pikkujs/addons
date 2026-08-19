import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomObjectFieldsLimitInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
})

export const CustomObjectFieldsLimitOutput = z.object({
  count: z.number().int().optional().describe("The current numnber of the requested resource"),
  limit: z.number().int().optional().describe("The maximum allowed number for the requested resource"),
})

export const customObjectFieldsLimit = pikkuSessionlessFunc({
  description: "List the current count and the limit for a custom object's fields\n#### Allowed For\n* Agents",
  input: CustomObjectFieldsLimitInput,
  output: CustomObjectFieldsLimitOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/custom_objects/{custom_object_key}/limits/field_limit", data) as any
  },
})
