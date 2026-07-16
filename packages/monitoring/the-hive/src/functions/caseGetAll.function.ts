import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CaseGetAllInput = z.object({
  range: z.string().optional(),
  sort: z.string().optional(),
})

export const CaseGetAllOutput = z.record(z.string(), z.unknown())

export const caseGetAll = pikkuSessionlessFunc({
  description: "Get many cases",
  input: CaseGetAllInput,
  output: CaseGetAllOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("GET", "/case", data) as any
  },
})
