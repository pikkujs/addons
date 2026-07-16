import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ObservableUpdateInput = z.object({
  id: z.string(),
  message: z.string().optional(),
  tlp: z.number().optional(),
})

export const ObservableUpdateOutput = z.record(z.string(), z.unknown())

export const observableUpdate = pikkuSessionlessFunc({
  description: "Update an observable",
  input: ObservableUpdateInput,
  output: ObservableUpdateOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("PATCH", "/case/artifact/{id}", data) as any
  },
})
