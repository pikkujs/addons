import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const webflowWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Webflow Webhook Secret',
  description: "The site's webhook secret, or the app's client secret for OAuth apps",
  secretId: 'WEBFLOW_WEBHOOK_SECRET',
  schema: webflowWebhookSecretSchema,
})
