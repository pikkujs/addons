import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OpportunityGetAllInput = z.object({
  limit: z.number().int().optional(),
  filter: z.record(z.string(), z.unknown()).optional(),
})

export const OpportunityGetAllOutput = z.record(z.string(), z.unknown())

export const opportunityGetAll = pikkuSessionlessFunc({
  description: "GetAll opportunity",
  input: OpportunityGetAllInput,
  output: OpportunityGetAllOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/opportunity/getAll", data) as any
  },
})
