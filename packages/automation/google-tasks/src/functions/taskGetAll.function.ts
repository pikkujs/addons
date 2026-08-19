import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskGetAllInput = z.object({
  tasklist: z.string(),
  maxResults: z.number().int().optional(),
  showCompleted: z.boolean().optional(),
  showDeleted: z.boolean().optional(),
  showHidden: z.boolean().optional(),
})

export const TaskGetAllOutput = z.object({
  kind: z.string().optional(),
  items: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const taskGetAll = pikkuSessionlessFunc({
  description: "List all tasks in a task list",
  input: TaskGetAllInput,
  output: TaskGetAllOutput,
  func: async ({ googleTasks }, data) => {
    return googleTasks.call("GET", "/tasks/v1/lists/{tasklist}/tasks", data) as any
  },
})
