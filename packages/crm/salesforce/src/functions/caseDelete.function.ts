import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CaseDeleteInput = z.object({
  id: z.string(),
})

export const CaseDeleteOutput = z.record(z.string(), z.unknown())

export const caseDelete = pikkuSessionlessFunc({
  description: "Delete Case",
  input: CaseDeleteInput,
  output: CaseDeleteOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("DELETE", "/sobjects/Case/{id}", data) as any
  },
})
