import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActivityCreateInput = z.object({
  summary: z.string().optional(),
  note: z.string().optional(),
  activityType: z.string().optional(),
})

export const ActivityCreateOutput = z.record(z.string(), z.unknown())

export const activityCreate = pikkuSessionlessFunc({
  description: "Create activity",
  input: ActivityCreateInput,
  output: ActivityCreateOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/activity/create", data) as any
  },
})
