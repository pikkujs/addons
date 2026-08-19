import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskCreateInput = z.object({
  listId: z.string(),
  name: z.string().optional(),
  content: z.string().optional(),
  status: z.string().optional(),
})

export const TaskCreateOutput = z.record(z.string(), z.unknown())

export const taskCreate = pikkuSessionlessFunc({
  description: "Task create",
  input: TaskCreateInput,
  output: TaskCreateOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("POST", "/list/{listId}/task", data) as any
  },
})
