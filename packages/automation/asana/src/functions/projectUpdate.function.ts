import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProjectUpdateInput = z.object({
  projectId: z.string(),
  name: z.string().optional(),
  notes: z.string().optional(),
})

export const ProjectUpdateOutput = z.record(z.string(), z.unknown())

export const projectUpdate = pikkuSessionlessFunc({
  description: "Project update",
  input: ProjectUpdateInput,
  output: ProjectUpdateOutput,
  func: async ({ asana }, data) => {
    return asana.call("PUT", "/projects/{projectId}", data) as any
  },
})
