import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EmailSendInput = z.object({
  user_id: z.number().int().optional(),
  subject: z.string().optional(),
})

export const EmailSendOutput = z.record(z.string(), z.unknown())

export const emailSend = pikkuSessionlessFunc({
  description: "Send an email",
  input: EmailSendInput,
  output: EmailSendOutput,
  func: async ({ keap }, data) => {
    return keap.call("POST", "/emails/queue", data) as any
  },
})
