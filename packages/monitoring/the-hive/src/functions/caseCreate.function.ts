import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CaseCreateInput = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  severity: z.number().optional(),
  owner: z.string().optional(),
  tlp: z.number().optional(),
})

export const CaseCreateOutput = z.record(z.string(), z.unknown())

export const caseCreate = pikkuSessionlessFunc({
  description: "Create a case",
  input: CaseCreateInput,
  output: CaseCreateOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/case", data) as any
  },
})
