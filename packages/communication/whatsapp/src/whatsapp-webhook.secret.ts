import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'
import { defineVariable } from '@pikku/core/variable'

export const whatsappWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'WhatsApp Webhook Secret',
  description: "The Meta app's secret, which signs webhook deliveries",
  secretId: 'WHATSAPP_APP_SECRET',
  schema: whatsappWebhookSecretSchema,
})

export const whatsappWebhookVerifyTokenSchema = z.string()

defineVariable({
  name: 'whatsapp_webhook_verify_token',
  displayName: 'WhatsApp Webhook Verify Token',
  description: "The verify token entered when the webhook was configured",
  variableId: 'WHATSAPP_WEBHOOK_VERIFY_TOKEN',
  schema: whatsappWebhookVerifyTokenSchema,
})
