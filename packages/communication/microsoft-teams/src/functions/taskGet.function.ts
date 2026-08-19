import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskGetInput = z.object({
  taskId: z.string(),
})

export const TaskGetOutput = z.record(z.string(), z.unknown())

export const taskGet = pikkuSessionlessFunc({
  description: "Get a task",
  input: TaskGetInput,
  output: TaskGetOutput,
  func: async ({ microsoftTeams }, data) => {
    return microsoftTeams.call("GET", "/planner/tasks/{taskId}", data) as any
  },
})
