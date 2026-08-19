import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProjectUpdateInput = z.object({
  workspaceId: z.string(),
  projectId: z.string(),
  name: z.string().optional(),
  note: z.string().optional(),
})

export const ProjectUpdateOutput = z.record(z.string(), z.unknown())

export const projectUpdate = pikkuSessionlessFunc({
  description: "Update a project",
  input: ProjectUpdateInput,
  output: ProjectUpdateOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("PUT", "/workspaces/{workspaceId}/projects/{projectId}", data) as any
  },
})
