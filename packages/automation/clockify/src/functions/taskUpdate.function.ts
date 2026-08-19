import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskUpdateInput = z.object({
  workspaceId: z.string(),
  projectId: z.string(),
  taskId: z.string(),
  name: z.string().optional(),
})

export const TaskUpdateOutput = z.record(z.string(), z.unknown())

export const taskUpdate = pikkuSessionlessFunc({
  description: "Update a task",
  input: TaskUpdateInput,
  output: TaskUpdateOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("PUT", "/workspaces/{workspaceId}/projects/{projectId}/tasks/{taskId}", data) as any
  },
})
