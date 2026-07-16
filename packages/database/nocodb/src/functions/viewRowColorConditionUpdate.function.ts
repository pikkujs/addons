import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ViewRowColorConditionUpdateInput = z.object({
  viewId: z.string().min(0).max(20).describe("Model for ID").describe("Unique View ID"),
  id: z.string().min(0).max(20).describe("Model for ID").describe("Unique Row Color Condition ID"),
  color: z.string().describe("Color to apply to matching rows"),
  is_set_as_background: z.boolean().describe("Whether to use the color as background"),
  nc_order: z.number().describe("Order of the condition"),
})

export const viewRowColorConditionUpdate = pikkuSessionlessFunc({
  input: ViewRowColorConditionUpdateInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/meta/views/{viewId}/row-color-conditions/{id}", data)
  },
})
