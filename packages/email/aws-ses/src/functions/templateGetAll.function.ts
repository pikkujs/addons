import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TemplateGetAllInput = z.object({
  limit: z.number().optional(),
})

export const TemplateGetAllOutput = z.record(z.string(), z.unknown())

export const templateGetAll = pikkuSessionlessFunc({
  description: "Get many templates",
  input: TemplateGetAllInput,
  output: TemplateGetAllOutput,
  func: async ({ awsSes }, data) => {
    return awsSes.call("GET", "/template/list", data) as any
  },
})
