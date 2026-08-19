import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProjectDeleteInput = z.object({
  id: z.string(),
})

export const ProjectDeleteOutput = z.record(z.string(), z.unknown())

export const projectDelete = pikkuSessionlessFunc({
  description: "Project delete",
  input: ProjectDeleteInput,
  output: ProjectDeleteOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("DELETE", "/projects/{id}", data) as any
  },
})
