import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskTagRemoveInput = z.object({
  taskId: z.string(),
  tagName: z.string(),
})

export const TaskTagRemoveOutput = z.record(z.string(), z.unknown())

export const taskTagRemove = pikkuSessionlessFunc({
  description: "Task tag remove",
  input: TaskTagRemoveInput,
  output: TaskTagRemoveOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("DELETE", "/task/{taskId}/tag/{tagName}", data) as any
  },
})
