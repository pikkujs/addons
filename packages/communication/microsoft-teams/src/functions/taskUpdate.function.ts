import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskUpdateInput = z.object({
  taskId: z.string(),
  title: z.string().optional(),
  bucketId: z.string().optional(),
  percentComplete: z.number().optional(),
})

export const TaskUpdateOutput = z.record(z.string(), z.unknown())

export const taskUpdate = pikkuSessionlessFunc({
  description: "Update a task",
  input: TaskUpdateInput,
  output: TaskUpdateOutput,
  func: async ({ microsoftTeams }, data) => {
    return microsoftTeams.call("PATCH", "/planner/tasks/{taskId}", data) as any
  },
})
