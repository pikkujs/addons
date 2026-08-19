import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskGetInput = z.object({
  tasklist: z.string(),
  task: z.string(),
})

export const TaskGetOutput = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  status: z.string().optional(),
})

export const taskGet = pikkuSessionlessFunc({
  description: "Get a task by ID",
  input: TaskGetInput,
  output: TaskGetOutput,
  func: async ({ googleTasks }, data) => {
    return googleTasks.call("GET", "/tasks/v1/lists/{tasklist}/tasks/{task}", data) as any
  },
})
