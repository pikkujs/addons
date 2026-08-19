import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LogExecuteResponderInput = z.object({
  id: z.string(),
  responderId: z.string().optional(),
})

export const LogExecuteResponderOutput = z.record(z.string(), z.unknown())

export const logExecuteResponder = pikkuSessionlessFunc({
  description: "Execute a responder on a log",
  input: LogExecuteResponderInput,
  output: LogExecuteResponderOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/case/task/log/{id}/responder", data) as any
  },
})
