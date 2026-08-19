import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReorderCustomObjectFieldsInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
})

export const ReorderCustomObjectFieldsOutput = z.string().describe("Empty response")

export const reorderCustomObjectFields = pikkuSessionlessFunc({
  description: "Sets a preferred order of custom fields for a specific object by providing field ids in the desired order.\n#### Allowed For\n\n* Admins",
  input: ReorderCustomObjectFieldsInput,
  output: ReorderCustomObjectFieldsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/custom_objects/{custom_object_key}/fields/reorder", data) as any
  },
})
