import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProjectGetAllOutput = z.record(z.string(), z.unknown())

export const projectGetAll = pikkuSessionlessFunc({
  description: "Project get all",
  output: ProjectGetAllOutput,
  func: async ({ harvest }) => {
    return harvest.call("GET", "/projects") as any
  },
})
