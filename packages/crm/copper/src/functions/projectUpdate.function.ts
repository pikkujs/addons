import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProjectUpdateInput = z.object({
  projectId: z.string(),
  name: z.string().optional(),
  details: z.string().optional(),
  status: z.string().optional(),
})

export const ProjectUpdateOutput = z.record(z.string(), z.unknown())

export const projectUpdate = pikkuSessionlessFunc({
  description: "Update a project",
  input: ProjectUpdateInput,
  output: ProjectUpdateOutput,
  func: async ({ copper }, data) => {
    return copper.call("PUT", "/projects/{projectId}", data) as any
  },
})
