import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskCreateInput = z.object({
  planId: z.string().optional(),
  bucketId: z.string().optional(),
  title: z.string().optional(),
})

export const TaskCreateOutput = z.record(z.string(), z.unknown())

export const taskCreate = pikkuSessionlessFunc({
  description: "Create a task",
  input: TaskCreateInput,
  output: TaskCreateOutput,
  func: async ({ microsoftTeams }, data) => {
    return microsoftTeams.call("POST", "/planner/tasks", data) as any
  },
})
