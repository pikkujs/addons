import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EmailSendTemplateInput = z.object({
  fromEmail: z.string().optional(),
  fromName: z.string().optional(),
  toEmail: z.string().optional(),
  subject: z.string().optional(),
  templateId: z.string().optional(),
})

export const EmailSendTemplateOutput = z.object({
  status: z.string().optional(),
})

export const emailSendTemplate = pikkuSessionlessFunc({
  description: "Send an email template",
  input: EmailSendTemplateInput,
  output: EmailSendTemplateOutput,
  func: async ({ mailjet }, data) => {
    return mailjet.call("POST", "/v3.1/send/template", data) as any
  },
})
