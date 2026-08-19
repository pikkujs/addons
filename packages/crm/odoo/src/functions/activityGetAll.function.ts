import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActivityGetAllInput = z.object({
  limit: z.number().int().optional(),
  filter: z.record(z.string(), z.unknown()).optional(),
})

export const ActivityGetAllOutput = z.record(z.string(), z.unknown())

export const activityGetAll = pikkuSessionlessFunc({
  description: "GetAll activity",
  input: ActivityGetAllInput,
  output: ActivityGetAllOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/activity/getAll", data) as any
  },
})
