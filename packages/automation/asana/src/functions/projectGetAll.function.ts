import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProjectGetAllInput = z.object({
  workspace: z.string().optional(),
  limit: z.number().int().optional(),
})

export const ProjectGetAllOutput = z.record(z.string(), z.unknown())

export const projectGetAll = pikkuSessionlessFunc({
  description: "Project get all",
  input: ProjectGetAllInput,
  output: ProjectGetAllOutput,
  func: async ({ asana }, data) => {
    return asana.call("GET", "/projects", data) as any
  },
})
