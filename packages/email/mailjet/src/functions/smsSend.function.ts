import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SmsSendInput = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  text: z.string().optional(),
})

export const SmsSendOutput = z.object({
  status: z.string().optional(),
})

export const smsSend = pikkuSessionlessFunc({
  description: "Send an SMS",
  input: SmsSendInput,
  output: SmsSendOutput,
  func: async ({ mailjet }, data) => {
    return mailjet.call("POST", "/v4/sms-send", data) as any
  },
})
