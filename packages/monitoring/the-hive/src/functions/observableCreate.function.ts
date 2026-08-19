import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ObservableCreateInput = z.object({
  caseId: z.string(),
  dataType: z.string().optional(),
  data: z.string().optional(),
  message: z.string().optional(),
  tlp: z.number().optional(),
})

export const ObservableCreateOutput = z.record(z.string(), z.unknown())

export const observableCreate = pikkuSessionlessFunc({
  description: "Create an observable",
  input: ObservableCreateInput,
  output: ObservableCreateOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/case/{caseId}/artifact", data) as any
  },
})
