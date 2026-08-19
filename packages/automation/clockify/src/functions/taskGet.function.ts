import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskGetInput = z.object({
  workspaceId: z.string(),
  projectId: z.string(),
  taskId: z.string(),
})

export const TaskGetOutput = z.record(z.string(), z.unknown())

export const taskGet = pikkuSessionlessFunc({
  description: "Get a task",
  input: TaskGetInput,
  output: TaskGetOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("GET", "/workspaces/{workspaceId}/projects/{projectId}/tasks/{taskId}", data) as any
  },
})
