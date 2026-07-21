import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskGetAllInput = z.object({
  range: z.string().optional(),
  sort: z.string().optional(),
})

export const TaskGetAllOutput = z.record(z.string(), z.unknown())

export const taskGetAll = pikkuSessionlessFunc({
  description: "Get many tasks",
  input: TaskGetAllInput,
  output: TaskGetAllOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("GET", "/case/task", data) as any
  },
})
