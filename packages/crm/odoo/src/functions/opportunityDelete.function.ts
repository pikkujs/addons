import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OpportunityDeleteInput = z.object({
  id: z.string().optional().describe("Odoo record ID"),
})

export const OpportunityDeleteOutput = z.record(z.string(), z.unknown())

export const opportunityDelete = pikkuSessionlessFunc({
  description: "Delete opportunity",
  input: OpportunityDeleteInput,
  output: OpportunityDeleteOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/opportunity/delete", data) as any
  },
})
