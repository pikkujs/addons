import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const onfleetWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Onfleet Webhook Secret',
  description: "The organization's webhook secret, as hex",
  secretId: 'ONFLEET_WEBHOOK_SECRET',
  schema: onfleetWebhookSecretSchema,
})
