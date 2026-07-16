import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskTagRemoveInput = z.object({
  taskId: z.string(),
  tag: z.string().optional(),
})

export const TaskTagRemoveOutput = z.record(z.string(), z.unknown())

export const taskTagRemove = pikkuSessionlessFunc({
  description: "Task tag remove",
  input: TaskTagRemoveInput,
  output: TaskTagRemoveOutput,
  func: async ({ asana }, data) => {
    return asana.call("POST", "/tasks/{taskId}/removeTag", data) as any
  },
})
