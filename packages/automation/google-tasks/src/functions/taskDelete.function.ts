import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskDeleteInput = z.object({
  tasklist: z.string(),
  task: z.string(),
})

export const TaskDeleteOutput = z.object({
  success: z.boolean().optional(),
})

export const taskDelete = pikkuSessionlessFunc({
  description: "Delete a task",
  input: TaskDeleteInput,
  output: TaskDeleteOutput,
  func: async ({ googleTasks }, data) => {
    return googleTasks.call("DELETE", "/tasks/v1/lists/{tasklist}/tasks/{task}", data) as any
  },
})
