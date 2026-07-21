import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProjectDeleteInput = z.object({
  workspaceId: z.string(),
  projectId: z.string(),
})

export const ProjectDeleteOutput = z.record(z.string(), z.unknown())

export const projectDelete = pikkuSessionlessFunc({
  description: "Delete a project",
  input: ProjectDeleteInput,
  output: ProjectDeleteOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("DELETE", "/workspaces/{workspaceId}/projects/{projectId}", data) as any
  },
})
