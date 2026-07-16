import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReorderUserFieldOutput = z.string().describe("Empty response")

export const reorderUserField = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins",
  output: ReorderUserFieldOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("PUT", "/api/v2/user_fields/reorder") as any
  },
})
