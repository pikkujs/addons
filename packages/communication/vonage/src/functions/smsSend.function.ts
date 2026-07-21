import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SmsSendInput = z.object({
  from: z.string().describe("The name or number the message should be sent from"),
  to: z.string().describe("The number the message should be sent to in E.164 format"),
  text: z.string().describe("The body of the message being sent"),
  "client-ref": z.string().optional().describe("Your own reference of up to 40 characters"),
  callback: z.string().optional().describe("The webhook endpoint the delivery receipt is sent to"),
  ttl: z.number().optional().describe("Message time-to-live in milliseconds"),
})

export const SmsSendOutput = z.object({
  "message-count": z.string().optional(),
  messages: z.array(z.object({
    to: z.string().optional(),
    "message-id": z.string().optional(),
    status: z.string().optional(),
  })).optional(),
})

export const smsSend = pikkuSessionlessFunc({
  description: "Send an SMS message",
  input: SmsSendInput,
  output: SmsSendOutput,
  func: async ({ vonage }, data) => {
    return vonage.call("POST", "/sms/json", data) as any
  },
})
