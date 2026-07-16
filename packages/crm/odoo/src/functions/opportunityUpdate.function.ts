import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OpportunityUpdateInput = z.object({
  id: z.string().optional().describe("Odoo record ID"),
  name: z.string().optional(),
  partnerName: z.string().optional(),
  expectedRevenue: z.number().optional(),
  probability: z.number().optional(),
})

export const OpportunityUpdateOutput = z.record(z.string(), z.unknown())

export const opportunityUpdate = pikkuSessionlessFunc({
  description: "Update opportunity",
  input: OpportunityUpdateInput,
  output: OpportunityUpdateOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/opportunity/update", data) as any
  },
})
