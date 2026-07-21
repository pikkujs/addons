import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TemplateGetAllOutput = z.object({
  items: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const templateGetAll = pikkuSessionlessFunc({
  description: "List templates",
  output: TemplateGetAllOutput,
  func: async ({ bannerbear }) => {
    return bannerbear.call("GET", "/templates") as any
  },
})
