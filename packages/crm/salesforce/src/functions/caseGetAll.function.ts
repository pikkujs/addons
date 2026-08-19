import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CaseGetAllInput = z.object({
  q: z.string().optional(),
  limit: z.number().int().optional(),
})

export const CaseGetAllOutput = z.object({
  totalSize: z.number().int().optional(),
  done: z.boolean().optional(),
})

export const caseGetAll = pikkuSessionlessFunc({
  description: "Get many Case",
  input: CaseGetAllInput,
  output: CaseGetAllOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/query/Case", data) as any
  },
})
