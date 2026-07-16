import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TemplateGetInput = z.object({
  templateName: z.string(),
})

export const TemplateGetOutput = z.record(z.string(), z.unknown())

export const templateGet = pikkuSessionlessFunc({
  description: "Get a template",
  input: TemplateGetInput,
  output: TemplateGetOutput,
  func: async ({ awsSes }, data) => {
    return awsSes.call("GET", "/template/get", data) as any
  },
})
