import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const whatsappSecretsSchema = z.object({
  accessToken: z.string().describe('WhatsApp Cloud API access token'),
  phoneNumberId: z.string().describe('WhatsApp Business phone number ID'),
})

export type WhatsappSecrets = z.infer<typeof whatsappSecretsSchema>

wireSecret({
  name: 'whatsapp',
  displayName: 'WhatsApp Cloud API',
  description: 'WhatsApp Business messaging platform',
  secretId: 'WHATSAPP_CREDENTIALS',
  schema: whatsappSecretsSchema,
})
