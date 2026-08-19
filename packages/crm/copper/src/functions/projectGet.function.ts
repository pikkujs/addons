import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProjectGetInput = z.object({
  projectId: z.string(),
})

export const ProjectGetOutput = z.record(z.string(), z.unknown())

export const projectGet = pikkuSessionlessFunc({
  description: "Get a project",
  input: ProjectGetInput,
  output: ProjectGetOutput,
  func: async ({ copper }, data) => {
    return copper.call("GET", "/projects/{projectId}", data) as any
  },
})
