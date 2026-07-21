import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProjectUpdateInput = z.object({
  id: z.string(),
  name: z.string().optional(),
})

export const ProjectUpdateOutput = z.record(z.string(), z.unknown())

export const projectUpdate = pikkuSessionlessFunc({
  description: "Project update",
  input: ProjectUpdateInput,
  output: ProjectUpdateOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("PATCH", "/projects/{id}", data) as any
  },
})
