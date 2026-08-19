import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OpportunityCreateInput = z.object({
  name: z.string().optional(),
  partnerName: z.string().optional(),
  expectedRevenue: z.number().optional(),
  probability: z.number().optional(),
})

export const OpportunityCreateOutput = z.record(z.string(), z.unknown())

export const opportunityCreate = pikkuSessionlessFunc({
  description: "Create opportunity",
  input: OpportunityCreateInput,
  output: OpportunityCreateOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/opportunity/create", data) as any
  },
})
