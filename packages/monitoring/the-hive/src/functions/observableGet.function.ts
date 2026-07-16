import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ObservableGetInput = z.object({
  id: z.string(),
})

export const ObservableGetOutput = z.record(z.string(), z.unknown())

export const observableGet = pikkuSessionlessFunc({
  description: "Get an observable",
  input: ObservableGetInput,
  output: ObservableGetOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("GET", "/case/artifact/{id}", data) as any
  },
})
