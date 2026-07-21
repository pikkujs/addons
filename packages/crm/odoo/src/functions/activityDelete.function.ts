import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActivityDeleteInput = z.object({
  id: z.string().optional().describe("Odoo record ID"),
})

export const ActivityDeleteOutput = z.record(z.string(), z.unknown())

export const activityDelete = pikkuSessionlessFunc({
  description: "Delete activity",
  input: ActivityDeleteInput,
  output: ActivityDeleteOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/activity/delete", data) as any
  },
})
