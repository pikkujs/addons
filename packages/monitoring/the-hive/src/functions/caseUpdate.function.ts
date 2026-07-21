import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CaseUpdateInput = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  summary: z.string().optional(),
})

export const CaseUpdateOutput = z.record(z.string(), z.unknown())

export const caseUpdate = pikkuSessionlessFunc({
  description: "Update a case",
  input: CaseUpdateInput,
  output: CaseUpdateOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("PATCH", "/case/{id}", data) as any
  },
})
