import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskCreateInput = z.object({
  workspaceId: z.string(),
  projectId: z.string(),
  name: z.string().optional(),
})

export const TaskCreateOutput = z.record(z.string(), z.unknown())

export const taskCreate = pikkuSessionlessFunc({
  description: "Create a task",
  input: TaskCreateInput,
  output: TaskCreateOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("POST", "/workspaces/{workspaceId}/projects/{projectId}/tasks", data) as any
  },
})
