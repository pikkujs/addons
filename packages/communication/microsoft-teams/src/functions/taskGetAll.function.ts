import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskGetAllInput = z.object({
  planId: z.string(),
})

export const TaskGetAllOutput = z.record(z.string(), z.unknown())

export const taskGetAll = pikkuSessionlessFunc({
  description: "Get many tasks",
  input: TaskGetAllInput,
  output: TaskGetAllOutput,
  func: async ({ microsoftTeams }, data) => {
    return microsoftTeams.call("GET", "/planner/plans/{planId}/tasks", data) as any
  },
})
