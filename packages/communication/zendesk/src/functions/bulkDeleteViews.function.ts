import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BulkDeleteViewsInput = z.object({
  ids: z.string().describe("The IDs of the views to delete. Example: \"1,2,3\""),
})

export const bulkDeleteViews = pikkuSessionlessFunc({
  description: "Deletes the views corresponding to the provided list of IDs.\n\n#### Allowed For\n* Agents",
  input: BulkDeleteViewsInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/views/destroy_many", data)
  },
})
