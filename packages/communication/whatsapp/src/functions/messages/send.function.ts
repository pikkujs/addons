import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessagesSendInput = z.object({
  to: z.string().describe('Recipient phone number with country code'),
  text: z.string().describe('Message text'),
  previewUrl: z.boolean().optional().describe('Enable URL preview'),
})

export const MessagesSendOutput = z.object({
  messaging_product: z.string(),
  contacts: z.array(z.object({
    input: z.string(),
    wa_id: z.string(),
  })),
  messages: z.array(z.object({
    id: z.string(),
  })),
})

type Output = z.infer<typeof MessagesSendOutput>

export const messagesSend = pikkuSessionlessFunc({
  description: 'Send a text message via WhatsApp',
  node: { displayName: 'Send Message', category: 'Communication', type: 'action' },
  input: MessagesSendInput,
  output: MessagesSendOutput,
  func: async ({ whatsapp }, data) => {
  return await whatsapp.request('POST', `${whatsapp.phoneNumberId}/messages`, {
    body: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: data.to,
      type: 'text',
      text: {
        preview_url: data.previewUrl ?? false,
        body: data.text,
      },
    },
  }) as Output
  },
})
