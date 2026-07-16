import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskUpdateInput = z.object({
  taskId: z.string(),
  name: z.string().optional(),
  details: z.string().optional(),
  status: z.string().optional(),
})

export const TaskUpdateOutput = z.record(z.string(), z.unknown())

export const taskUpdate = pikkuSessionlessFunc({
  description: "Update a task",
  input: TaskUpdateInput,
  output: TaskUpdateOutput,
  func: async ({ copper }, data) => {
    return copper.call("PUT", "/tasks/{taskId}", data) as any
  },
})
