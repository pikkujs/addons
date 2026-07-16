import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProjectCreateInput = z.object({
  workspaceId: z.string(),
  name: z.string().optional(),
  clientId: z.string().optional(),
  note: z.string().optional(),
})

export const ProjectCreateOutput = z.record(z.string(), z.unknown())

export const projectCreate = pikkuSessionlessFunc({
  description: "Create a project",
  input: ProjectCreateInput,
  output: ProjectCreateOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("POST", "/workspaces/{workspaceId}/projects", data) as any
  },
})
