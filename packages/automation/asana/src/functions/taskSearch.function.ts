import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskSearchInput = z.object({
  workspaceId: z.string(),
  text: z.string().optional(),
})

export const TaskSearchOutput = z.record(z.string(), z.unknown())

export const taskSearch = pikkuSessionlessFunc({
  description: "Task search",
  input: TaskSearchInput,
  output: TaskSearchOutput,
  func: async ({ asana }, data) => {
    return asana.call("GET", "/workspaces/{workspaceId}/tasks/search", data) as any
  },
})
