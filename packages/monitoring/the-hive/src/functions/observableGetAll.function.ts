import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ObservableGetAllInput = z.object({
  range: z.string().optional(),
  sort: z.string().optional(),
})

export const ObservableGetAllOutput = z.record(z.string(), z.unknown())

export const observableGetAll = pikkuSessionlessFunc({
  description: "Get many observables",
  input: ObservableGetAllInput,
  output: ObservableGetAllOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("GET", "/case/artifact", data) as any
  },
})
