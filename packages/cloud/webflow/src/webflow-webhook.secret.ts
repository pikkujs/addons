import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const webflowWebhookSecretSchema = z.string()

defineCredential({
  name: 'webflowWebhookSecret',
  displayName: 'Webflow Webhook Secret',
  description: "The site's webhook secret, or the app's client secret for OAuth apps",
  type: 'singleton',
  schema: webflowWebhookSecretSchema,
})
