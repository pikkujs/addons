import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskCountInput = z.object({
  query: z.record(z.string(), z.unknown()).optional(),
})

export const TaskCountOutput = z.record(z.string(), z.unknown())

export const taskCount = pikkuSessionlessFunc({
  description: "Count tasks",
  input: TaskCountInput,
  output: TaskCountOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/task/count", data) as any
  },
})
