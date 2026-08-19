import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskDeleteInput = z.object({
  taskId: z.string(),
})

export const TaskDeleteOutput = z.record(z.string(), z.unknown())

export const taskDelete = pikkuSessionlessFunc({
  description: "Delete a task",
  input: TaskDeleteInput,
  output: TaskDeleteOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("DELETE", "/tasks/{taskId}", data) as any
  },
})
