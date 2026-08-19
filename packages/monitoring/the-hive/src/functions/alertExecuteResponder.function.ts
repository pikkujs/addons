import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AlertExecuteResponderInput = z.object({
  id: z.string(),
  responderId: z.string().optional(),
})

export const AlertExecuteResponderOutput = z.record(z.string(), z.unknown())

export const alertExecuteResponder = pikkuSessionlessFunc({
  description: "Execute a responder on an alert",
  input: AlertExecuteResponderInput,
  output: AlertExecuteResponderOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/alert/{id}/responder", data) as any
  },
})
