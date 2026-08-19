import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EmailSendInput = z.object({
  fromEmail: z.string().optional(),
  fromName: z.string().optional(),
  toEmail: z.string().optional(),
  subject: z.string().optional(),
  html: z.string().optional(),
  text: z.string().optional(),
})

export const EmailSendOutput = z.object({
  status: z.string().optional(),
})

export const emailSend = pikkuSessionlessFunc({
  description: "Send an email",
  input: EmailSendInput,
  output: EmailSendOutput,
  func: async ({ mailjet }, data) => {
    return mailjet.call("POST", "/v3.1/send", data) as any
  },
})
