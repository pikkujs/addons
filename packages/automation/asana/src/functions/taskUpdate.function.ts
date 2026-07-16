import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskUpdateInput = z.object({
  taskId: z.string(),
  name: z.string().optional(),
  notes: z.string().optional(),
  completed: z.boolean().optional(),
})

export const TaskUpdateOutput = z.record(z.string(), z.unknown())

export const taskUpdate = pikkuSessionlessFunc({
  description: "Task update",
  input: TaskUpdateInput,
  output: TaskUpdateOutput,
  func: async ({ asana }, data) => {
    return asana.call("PUT", "/tasks/{taskId}", data) as any
  },
})
