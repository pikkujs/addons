import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EmailSendInput = z.object({
  fromEmail: z.string().optional(),
  toAddresses: z.array(z.string()).optional(),
  subject: z.string().optional(),
  body: z.string().optional(),
  isBodyHtml: z.boolean().optional(),
})

export const EmailSendOutput = z.record(z.string(), z.unknown())

export const emailSend = pikkuSessionlessFunc({
  description: "Send an email",
  input: EmailSendInput,
  output: EmailSendOutput,
  func: async ({ awsSes }, data) => {
    return awsSes.call("POST", "/email/send", data) as any
  },
})
