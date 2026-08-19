import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CaseUpdateInput = z.object({
  id: z.string(),
  type: z.string().optional(),
})

export const CaseUpdateOutput = z.record(z.string(), z.unknown())

export const caseUpdate = pikkuSessionlessFunc({
  description: "Update Case",
  input: CaseUpdateInput,
  output: CaseUpdateOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("PATCH", "/sobjects/Case/{id}", data) as any
  },
})
