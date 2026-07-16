import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskTagAddInput = z.object({
  taskId: z.string(),
  tagName: z.string(),
})

export const TaskTagAddOutput = z.record(z.string(), z.unknown())

export const taskTagAdd = pikkuSessionlessFunc({
  description: "Task tag add",
  input: TaskTagAddInput,
  output: TaskTagAddOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("POST", "/task/{taskId}/tag/{tagName}", data) as any
  },
})
