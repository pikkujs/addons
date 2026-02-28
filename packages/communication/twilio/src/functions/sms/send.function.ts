import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SmsSendInput = z.object({
  From: z.string().describe('A Twilio phone number or short code in E.164 format'),
  To: z.string().describe('The destination phone number in E.164 format'),
  Body: z.string().describe('The text of the message you want to send, limited to 1600 characters'),
  StatusCallback: z.string().optional().describe('URL to send status callbacks to'),
  toWhatsapp: z.boolean().optional().describe('Whether to send via WhatsApp (prepends whatsapp: to numbers)'),
})

export const SmsSendOutput = z.object({
  sid: z.string().describe('The unique identifier for this message'),
  date_created: z.string().describe('The date this resource was created'),
  date_sent: z.string().nullable().describe('The date the message was sent'),
  status: z.string().describe('The status of the message'),
  from: z.string().describe('The phone number that initiated the message'),
  to: z.string().describe('The phone number that received the message'),
  body: z.string().describe('The text of the message'),
})

type Output = z.infer<typeof SmsSendOutput>

export const smsSend = pikkuSessionlessFunc({
  description: 'Send an SMS, MMS, or WhatsApp message',
  node: { displayName: 'Send SMS', category: 'SMS', type: 'action' },
  input: SmsSendInput,
  output: SmsSendOutput,
  func: async ({ twilio }, { From, To, Body, StatusCallback, toWhatsapp }) => {
    const from = toWhatsapp ? `whatsapp:${From}` : From
    const to = toWhatsapp ? `whatsapp:${To}` : To

    return await twilio.request<Output>('/Messages.json', {
      body: { From: from, To: to, Body, StatusCallback },
    })
  },
})
