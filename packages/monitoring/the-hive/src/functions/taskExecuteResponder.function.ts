import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskExecuteResponderInput = z.object({
  id: z.string(),
  responderId: z.string().optional(),
})

export const TaskExecuteResponderOutput = z.record(z.string(), z.unknown())

export const taskExecuteResponder = pikkuSessionlessFunc({
  description: "Execute a responder on a task",
  input: TaskExecuteResponderInput,
  output: TaskExecuteResponderOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/case/task/{id}/responder", data) as any
  },
})
