import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const telegramWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Telegram Webhook Secret',
  description: "The secret_token given to setWebhook",
  secretId: 'TELEGRAM_WEBHOOK_SECRET',
  schema: telegramWebhookSecretSchema,
})
