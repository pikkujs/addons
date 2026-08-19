import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActivityGetInput = z.object({
  id: z.string().optional().describe("Odoo record ID"),
})

export const ActivityGetOutput = z.record(z.string(), z.unknown())

export const activityGet = pikkuSessionlessFunc({
  description: "Get activity",
  input: ActivityGetInput,
  output: ActivityGetOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/activity/get", data) as any
  },
})
