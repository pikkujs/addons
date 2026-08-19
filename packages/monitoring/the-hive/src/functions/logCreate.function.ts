import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LogCreateInput = z.object({
  taskId: z.string(),
  message: z.string().optional(),
  startDate: z.string().optional(),
  status: z.string().optional(),
})

export const LogCreateOutput = z.record(z.string(), z.unknown())

export const logCreate = pikkuSessionlessFunc({
  description: "Create a log",
  input: LogCreateInput,
  output: LogCreateOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/case/task/{taskId}/log", data) as any
  },
})
