import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TemplateGetInput = z.object({
  templateId: z.string(),
})

export const TemplateGetOutput = z.object({
  uid: z.string().optional(),
  name: z.string().optional(),
})

export const templateGet = pikkuSessionlessFunc({
  description: "Get a specific template",
  input: TemplateGetInput,
  output: TemplateGetOutput,
  func: async ({ bannerbear }, data) => {
    return bannerbear.call("GET", "/templates/{templateId}", data) as any
  },
})
