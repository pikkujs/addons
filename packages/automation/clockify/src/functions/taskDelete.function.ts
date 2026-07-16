import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskDeleteInput = z.object({
  workspaceId: z.string(),
  projectId: z.string(),
  taskId: z.string(),
})

export const TaskDeleteOutput = z.record(z.string(), z.unknown())

export const taskDelete = pikkuSessionlessFunc({
  description: "Delete a task",
  input: TaskDeleteInput,
  output: TaskDeleteOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("DELETE", "/workspaces/{workspaceId}/projects/{projectId}/tasks/{taskId}", data) as any
  },
})
