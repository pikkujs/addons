import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskUpdateInput = z.object({
  taskId: z.string(),
  name: z.string().optional(),
  content: z.string().optional(),
  status: z.string().optional(),
})

export const TaskUpdateOutput = z.record(z.string(), z.unknown())

export const taskUpdate = pikkuSessionlessFunc({
  description: "Task update",
  input: TaskUpdateInput,
  output: TaskUpdateOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("PUT", "/task/{taskId}", data) as any
  },
})
