import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CaseCreateInput = z.object({
  type: z.string().optional(),
})

export const CaseCreateOutput = z.object({
  id: z.string().optional(),
  success: z.boolean().optional(),
})

export const caseCreate = pikkuSessionlessFunc({
  description: "Create Case",
  input: CaseCreateInput,
  output: CaseCreateOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("POST", "/sobjects/Case", data) as any
  },
})
