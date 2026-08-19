import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskUpdateInput = z.object({
  taskId: z.string(),
  notes: z.string().optional(),
})

export const TaskUpdateOutput = z.record(z.string(), z.unknown())

export const taskUpdate = pikkuSessionlessFunc({
  description: "Update a task",
  input: TaskUpdateInput,
  output: TaskUpdateOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("PUT", "/tasks/{taskId}", data) as any
  },
})
