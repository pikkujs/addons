import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskGetAllInput = z.object({
  workspaceId: z.string(),
  projectId: z.string(),
  "page-size": z.number().int().optional(),
})

export const TaskGetAllOutput = z.record(z.string(), z.unknown())

export const taskGetAll = pikkuSessionlessFunc({
  description: "Get all tasks",
  input: TaskGetAllInput,
  output: TaskGetAllOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("GET", "/workspaces/{workspaceId}/projects/{projectId}/tasks", data) as any
  },
})
