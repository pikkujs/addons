import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TemplateUpdateInput = z.object({
  templateName: z.string().optional(),
  subjectPart: z.string().optional(),
  htmlPart: z.string().optional(),
  textPart: z.string().optional(),
})

export const TemplateUpdateOutput = z.record(z.string(), z.unknown())

export const templateUpdate = pikkuSessionlessFunc({
  description: "Update a template",
  input: TemplateUpdateInput,
  output: TemplateUpdateOutput,
  func: async ({ awsSes }, data) => {
    return awsSes.call("POST", "/template/update", data) as any
  },
})
