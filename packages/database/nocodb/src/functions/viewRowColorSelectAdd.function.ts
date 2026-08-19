import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ViewRowColorSelectAddInput = z.object({
  viewId: z.string().min(0).max(20).describe("Model for ID").describe("Unique View ID"),
  fk_column_id: z.string().describe("Column ID to use for row coloring"),
  is_set_as_background: z.boolean().describe("Whether to use the color as background"),
})

export const viewRowColorSelectAdd = pikkuSessionlessFunc({
  input: ViewRowColorSelectAddInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/views/{viewId}/row-color-select", data)
  },
})
