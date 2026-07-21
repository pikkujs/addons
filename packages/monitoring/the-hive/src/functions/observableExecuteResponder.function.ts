import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ObservableExecuteResponderInput = z.object({
  id: z.string(),
  responderId: z.string().optional(),
})

export const ObservableExecuteResponderOutput = z.record(z.string(), z.unknown())

export const observableExecuteResponder = pikkuSessionlessFunc({
  description: "Execute a responder on an observable",
  input: ObservableExecuteResponderInput,
  output: ObservableExecuteResponderOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/case/artifact/{id}/responder", data) as any
  },
})
