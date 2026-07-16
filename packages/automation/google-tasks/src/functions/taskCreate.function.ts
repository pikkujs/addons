import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskCreateInput = z.object({
  tasklist: z.string(),
  parent: z.string().optional(),
  previous: z.string().optional(),
  title: z.string().optional(),
  notes: z.string().optional(),
  status: z.string().optional(),
  due: z.string().optional(),
  completed: z.string().optional(),
})

export const TaskCreateOutput = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  status: z.string().optional(),
})

export const taskCreate = pikkuSessionlessFunc({
  description: "Create a task in a task list",
  input: TaskCreateInput,
  output: TaskCreateOutput,
  func: async ({ googleTasks }, data) => {
    return googleTasks.call("POST", "/tasks/v1/lists/{tasklist}/tasks", data) as any
  },
})
