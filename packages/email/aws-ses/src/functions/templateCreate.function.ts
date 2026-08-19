import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TemplateCreateInput = z.object({
  templateName: z.string().optional(),
  subjectPart: z.string().optional(),
  htmlPart: z.string().optional(),
  textPart: z.string().optional(),
})

export const TemplateCreateOutput = z.record(z.string(), z.unknown())

export const templateCreate = pikkuSessionlessFunc({
  description: "Create a template",
  input: TemplateCreateInput,
  output: TemplateCreateOutput,
  func: async ({ awsSes }, data) => {
    return awsSes.call("POST", "/template/create", data) as any
  },
})
