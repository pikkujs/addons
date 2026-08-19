import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskUpdateInput = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
})

export const TaskUpdateOutput = z.record(z.string(), z.unknown())

export const taskUpdate = pikkuSessionlessFunc({
  description: "Update a task",
  input: TaskUpdateInput,
  output: TaskUpdateOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("PATCH", "/case/task/{id}", data) as any
  },
})
