import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskTagAddInput = z.object({
  taskId: z.string(),
  tag: z.string().optional(),
})

export const TaskTagAddOutput = z.record(z.string(), z.unknown())

export const taskTagAdd = pikkuSessionlessFunc({
  description: "Task tag add",
  input: TaskTagAddInput,
  output: TaskTagAddOutput,
  func: async ({ asana }, data) => {
    return asana.call("POST", "/tasks/{taskId}/addTag", data) as any
  },
})
