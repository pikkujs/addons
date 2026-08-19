import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProjectGetInput = z.object({
  id: z.string(),
})

export const ProjectGetOutput = z.record(z.string(), z.unknown())

export const projectGet = pikkuSessionlessFunc({
  description: "Project get",
  input: ProjectGetInput,
  output: ProjectGetOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("GET", "/projects/{id}", data) as any
  },
})
