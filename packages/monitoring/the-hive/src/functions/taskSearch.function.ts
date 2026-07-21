import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskSearchInput = z.object({
  query: z.record(z.string(), z.unknown()).optional(),
})

export const TaskSearchOutput = z.record(z.string(), z.unknown())

export const taskSearch = pikkuSessionlessFunc({
  description: "Search tasks",
  input: TaskSearchInput,
  output: TaskSearchOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/case/task/_search", data) as any
  },
})
