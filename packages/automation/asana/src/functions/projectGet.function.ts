import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProjectGetInput = z.object({
  projectId: z.string(),
})

export const ProjectGetOutput = z.record(z.string(), z.unknown())

export const projectGet = pikkuSessionlessFunc({
  description: "Project get",
  input: ProjectGetInput,
  output: ProjectGetOutput,
  func: async ({ asana }, data) => {
    return asana.call("GET", "/projects/{projectId}", data) as any
  },
})
