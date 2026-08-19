import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CountCustomObjectRecordsInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
})

export const CountCustomObjectRecordsOutput = z.object({
  count: z.record(z.string(), z.object({
    refreshed_at: z.string().datetime().optional().describe("The time the last count was performed"),
    value: z.number().int().optional().describe("Number of records at the time of the latest count operation"),
  })).optional(),
})

export const countCustomObjectRecords = pikkuSessionlessFunc({
  description: "Returns a total count of records for a specific custom object as well as the time the count was refreshed.\n\nIf the object has a parent field with `cascade_permissions_enabled`, non-admin agents receive a `403 Forbidden` response. Use the [Filtered Search endpoint](/api-reference/custom-data/custom-objects/custom_object_records/#filtered-search-of-custom-object-records) with a filter on the parent field instead.\n\n#### Allowed For\n* Agents",
  input: CountCustomObjectRecordsInput,
  output: CountCustomObjectRecordsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/custom_objects/{custom_object_key}/records/count", data) as any
  },
})
