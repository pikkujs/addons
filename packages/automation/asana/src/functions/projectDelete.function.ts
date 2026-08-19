import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProjectDeleteInput = z.object({
  projectId: z.string(),
})

export const ProjectDeleteOutput = z.record(z.string(), z.unknown())

export const projectDelete = pikkuSessionlessFunc({
  description: "Project delete",
  input: ProjectDeleteInput,
  output: ProjectDeleteOutput,
  func: async ({ asana }, data) => {
    return asana.call("DELETE", "/projects/{projectId}", data) as any
  },
})
