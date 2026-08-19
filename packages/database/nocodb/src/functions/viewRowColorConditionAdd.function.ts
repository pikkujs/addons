import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ViewRowColorConditionAddInput = z.object({
  viewId: z.string().min(0).max(20).describe("Model for ID").describe("Unique View ID"),
  color: z.string().describe("Color to apply to matching rows"),
  is_set_as_background: z.boolean().describe("Whether to use the color as background"),
  nc_order: z.number().describe("Order of the condition"),
  filter: z.object({
  comparison_op: z.enum(["eq", "neq", "gt", "gte", "lt", "lte", "like", "nlike", "in", "nin", "is", "isnot", "null", "notnull"]).describe("Comparison operator"),
  value: z.string().describe("Value to compare against"),
  fk_column_id: z.string().describe("Column ID to filter on"),
}),
})

export const viewRowColorConditionAdd = pikkuSessionlessFunc({
  input: ViewRowColorConditionAddInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/views/{viewId}/row-color-conditions", data)
  },
})
