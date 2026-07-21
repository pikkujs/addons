import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActivityUpdateInput = z.object({
  id: z.string().optional().describe("Odoo record ID"),
  summary: z.string().optional(),
  note: z.string().optional(),
  activityType: z.string().optional(),
})

export const ActivityUpdateOutput = z.record(z.string(), z.unknown())

export const activityUpdate = pikkuSessionlessFunc({
  description: "Update activity",
  input: ActivityUpdateInput,
  output: ActivityUpdateOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/activity/update", data) as any
  },
})
