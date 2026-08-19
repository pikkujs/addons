import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CaseGetInput = z.object({
  id: z.string(),
})

export const CaseGetOutput = z.record(z.string(), z.unknown())

export const caseGet = pikkuSessionlessFunc({
  description: "Get Case",
  input: CaseGetInput,
  output: CaseGetOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/sobjects/Case/{id}", data) as any
  },
})
