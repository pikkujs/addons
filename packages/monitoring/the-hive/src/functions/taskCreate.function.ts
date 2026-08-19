import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskCreateInput = z.object({
  caseId: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  owner: z.string().optional(),
})

export const TaskCreateOutput = z.record(z.string(), z.unknown())

export const taskCreate = pikkuSessionlessFunc({
  description: "Create a task",
  input: TaskCreateInput,
  output: TaskCreateOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/case/{caseId}/task", data) as any
  },
})
