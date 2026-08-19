import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LogGetAllInput = z.object({
  taskId: z.string().optional(),
  range: z.string().optional(),
})

export const LogGetAllOutput = z.record(z.string(), z.unknown())

export const logGetAll = pikkuSessionlessFunc({
  description: "Get many logs",
  input: LogGetAllInput,
  output: LogGetAllOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("GET", "/case/task/log", data) as any
  },
})
