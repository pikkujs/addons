import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ViewRowColorConditionDeleteInput = z.object({
  viewId: z.string().min(0).max(20).describe("Model for ID").describe("Unique View ID"),
  id: z.string().min(0).max(20).describe("Model for ID").describe("Unique Row Color Condition ID"),
})

export const viewRowColorConditionDelete = pikkuSessionlessFunc({
  input: ViewRowColorConditionDeleteInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/db/meta/views/{viewId}/row-color-conditions/{id}", data)
  },
})
