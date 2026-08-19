import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProjectGetInput = z.object({
  workspaceId: z.string(),
  projectId: z.string(),
})

export const ProjectGetOutput = z.record(z.string(), z.unknown())

export const projectGet = pikkuSessionlessFunc({
  description: "Get a project",
  input: ProjectGetInput,
  output: ProjectGetOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("GET", "/workspaces/{workspaceId}/projects/{projectId}", data) as any
  },
})
