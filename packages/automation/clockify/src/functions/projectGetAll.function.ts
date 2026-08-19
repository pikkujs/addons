import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProjectGetAllInput = z.object({
  workspaceId: z.string(),
  "page-size": z.number().int().optional(),
})

export const ProjectGetAllOutput = z.record(z.string(), z.unknown())

export const projectGetAll = pikkuSessionlessFunc({
  description: "Get all projects",
  input: ProjectGetAllInput,
  output: ProjectGetAllOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("GET", "/workspaces/{workspaceId}/projects", data) as any
  },
})
