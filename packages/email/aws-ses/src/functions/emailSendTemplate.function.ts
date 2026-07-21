import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EmailSendTemplateInput = z.object({
  fromEmail: z.string().optional(),
  toAddresses: z.array(z.string()).optional(),
  templateName: z.string().optional(),
  templateData: z.record(z.string(), z.unknown()).optional(),
})

export const EmailSendTemplateOutput = z.record(z.string(), z.unknown())

export const emailSendTemplate = pikkuSessionlessFunc({
  description: "Send an email based on a template",
  input: EmailSendTemplateInput,
  output: EmailSendTemplateOutput,
  func: async ({ awsSes }, data) => {
    return awsSes.call("POST", "/email/sendTemplate", data) as any
  },
})
