import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SmsSendInput = z.object({
  body: z.string().optional(),
})

export const SmsSendOutput = z.record(z.string(), z.unknown())

export const smsSend = pikkuSessionlessFunc({
  description: "Sms send",
  input: SmsSendInput,
  output: SmsSendOutput,
  func: async ({ msg91 }, data) => {
    return msg91.call("POST", "/v5/flow", data) as any
  },
})
