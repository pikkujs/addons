import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SmsSendInput = z.object({
  body: z.string().optional(),
})

export const SmsSendOutput = z.record(z.string(), z.unknown())

export const smsSend = pikkuSessionlessFunc({
  description: "Sms send",
  input: SmsSendInput,
  output: SmsSendOutput,
  func: async ({ mocean }, data) => {
    return mocean.call("POST", "/rest/2/sms", data) as any
  },
})
