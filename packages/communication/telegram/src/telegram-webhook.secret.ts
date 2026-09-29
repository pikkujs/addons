import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const telegramWebhookSecretSchema = z.string()

defineCredential({
  name: 'telegramWebhookSecret',
  displayName: 'Telegram Webhook Secret',
  description: "The secret_token given to setWebhook",
  type: 'singleton',
  schema: telegramWebhookSecretSchema,
})
