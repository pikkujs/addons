import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OpportunityGetInput = z.object({
  id: z.string().optional().describe("Odoo record ID"),
})

export const OpportunityGetOutput = z.record(z.string(), z.unknown())

export const opportunityGet = pikkuSessionlessFunc({
  description: "Get opportunity",
  input: OpportunityGetInput,
  output: OpportunityGetOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/opportunity/get", data) as any
  },
})
