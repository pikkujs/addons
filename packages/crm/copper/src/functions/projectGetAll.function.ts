import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProjectGetAllInput = z.object({
  page_number: z.number().optional(),
  page_size: z.number().optional(),
})

export const ProjectGetAllOutput = z.record(z.string(), z.unknown())

export const projectGetAll = pikkuSessionlessFunc({
  description: "List projects",
  input: ProjectGetAllInput,
  output: ProjectGetAllOutput,
  func: async ({ copper }, data) => {
    return copper.call("POST", "/projects/search", data) as any
  },
})
