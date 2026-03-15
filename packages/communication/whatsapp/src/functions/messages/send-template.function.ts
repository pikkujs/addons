import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const componentParameterSchema = z.object({
  type: z.enum(['text', 'currency', 'date_time', 'image', 'document', 'video']),
  text: z.string().optional(),
  image: z.object({ link: z.string() }).optional(),
  document: z.object({ link: z.string() }).optional(),
  video: z.object({ link: z.string() }).optional(),
})

export const componentSchema = z.object({
  type: z.enum(['header', 'body', 'button']),
  sub_type: z.string().optional(),
  index: z.number().optional(),
  parameters: z.array(componentParameterSchema).optional(),
})

export const MessagesSendTemplateInput = z.object({
  to: z.string().describe('Recipient phone number with country code'),
  templateName: z.string().describe('Template name'),
  languageCode: z.string().describe('Language code (e.g., en_US)'),
  components: z.array(componentSchema).optional().describe('Template components'),
})

export const MessagesSendTemplateOutput = z.object({
  messaging_product: z.string(),
  contacts: z.array(z.object({
    input: z.string(),
    wa_id: z.string(),
  })),
  messages: z.array(z.object({
    id: z.string(),
  })),
})

type Output = z.infer<typeof MessagesSendTemplateOutput>

export const messagesSendTemplate = pikkuSessionlessFunc({
  description: 'Send a template message via WhatsApp',
  node: { displayName: 'Send Template Message', category: 'Communication', type: 'action' },
  input: MessagesSendTemplateInput,
  output: MessagesSendTemplateOutput,
  func: async ({ whatsapp }, data) => {
  return await whatsapp.request('POST', `${whatsapp.phoneNumberId}/messages`, {
    body: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: data.to,
      type: 'template',
      template: {
        name: data.templateName,
        language: {
          code: data.languageCode,
        },
        components: data.components,
      },
    },
  }) as Output
  },
})
