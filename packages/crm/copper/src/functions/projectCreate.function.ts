import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProjectCreateInput = z.object({
  name: z.string().optional(),
  details: z.string().optional(),
  status: z.string().optional(),
})

export const ProjectCreateOutput = z.record(z.string(), z.unknown())

export const projectCreate = pikkuSessionlessFunc({
  description: "Create a project",
  input: ProjectCreateInput,
  output: ProjectCreateOutput,
  func: async ({ copper }, data) => {
    return copper.call("POST", "/projects", data) as any
  },
})
