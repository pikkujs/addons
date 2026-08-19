import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UpdatePrecomputationsInput = z.object({
  values: z.array(z.object({
  id: z.number().int(),
  value: z.string(),
})).optional(),
})

export const UpdatePrecomputationsOutput = z.unknown()

export const updatePrecomputations = pikkuSessionlessFunc({
  input: UpdatePrecomputationsInput,
  output: UpdatePrecomputationsOutput,
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/jql/function/computation", data) as any
  },
})
