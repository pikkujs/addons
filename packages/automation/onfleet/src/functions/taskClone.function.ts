import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskCloneInput = z.object({
  taskId: z.string(),
})

export const TaskCloneOutput = z.record(z.string(), z.unknown())

export const taskClone = pikkuSessionlessFunc({
  description: "Clone a task",
  input: TaskCloneInput,
  output: TaskCloneOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("POST", "/tasks/{taskId}/clone", data) as any
  },
})
