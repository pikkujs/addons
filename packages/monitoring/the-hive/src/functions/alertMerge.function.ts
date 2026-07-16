import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AlertMergeInput = z.object({
  id: z.string(),
  caseId: z.string(),
})

export const AlertMergeOutput = z.record(z.string(), z.unknown())

export const alertMerge = pikkuSessionlessFunc({
  description: "Merge an alert into an existing case",
  input: AlertMergeInput,
  output: AlertMergeOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/alert/{id}/merge/{caseId}", data) as any
  },
})
