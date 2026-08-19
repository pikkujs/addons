import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskUpdateInput = z.object({
  tasklist: z.string(),
  task: z.string(),
  previous: z.string().optional(),
  title: z.string().optional(),
  notes: z.string().optional(),
  status: z.string().optional(),
  due: z.string().optional(),
  completed: z.string().optional(),
})

export const TaskUpdateOutput = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  status: z.string().optional(),
})

export const taskUpdate = pikkuSessionlessFunc({
  description: "Update a task",
  input: TaskUpdateInput,
  output: TaskUpdateOutput,
  func: async ({ googleTasks }, data) => {
    return googleTasks.call("PATCH", "/tasks/v1/lists/{tasklist}/tasks/{task}", data) as any
  },
})
