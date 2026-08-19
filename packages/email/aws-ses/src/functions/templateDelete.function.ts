import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TemplateDeleteInput = z.object({
  templateName: z.string().optional(),
})

export const TemplateDeleteOutput = z.record(z.string(), z.unknown())

export const templateDelete = pikkuSessionlessFunc({
  description: "Delete a template",
  input: TemplateDeleteInput,
  output: TemplateDeleteOutput,
  func: async ({ awsSes }, data) => {
    return awsSes.call("POST", "/template/delete", data) as any
  },
})
