import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskCompleteInput = z.object({
  taskId: z.string(),
  success: z.boolean().optional(),
})

export const TaskCompleteOutput = z.record(z.string(), z.unknown())

export const taskComplete = pikkuSessionlessFunc({
  description: "Complete a task",
  input: TaskCompleteInput,
  output: TaskCompleteOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("POST", "/tasks/{taskId}/complete", data) as any
  },
})
