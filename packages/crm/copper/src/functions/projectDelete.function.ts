import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProjectDeleteInput = z.object({
  projectId: z.string(),
})

export const ProjectDeleteOutput = z.record(z.string(), z.unknown())

export const projectDelete = pikkuSessionlessFunc({
  description: "Delete a project",
  input: ProjectDeleteInput,
  output: ProjectDeleteOutput,
  func: async ({ copper }, data) => {
    return copper.call("DELETE", "/projects/{projectId}", data) as any
  },
})
