import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const storyblokWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Storyblok Webhook Secret',
  description: "The webhook's secret",
  secretId: 'STORYBLOK_WEBHOOK_SECRET',
  schema: storyblokWebhookSecretSchema,
})
