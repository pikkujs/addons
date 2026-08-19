import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CaseGetInput = z.object({
  id: z.string(),
})

export const CaseGetOutput = z.record(z.string(), z.unknown())

export const caseGet = pikkuSessionlessFunc({
  description: "Get a case",
  input: CaseGetInput,
  output: CaseGetOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("GET", "/case/{id}", data) as any
  },
})
