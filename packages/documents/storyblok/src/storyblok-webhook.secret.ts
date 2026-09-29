import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const storyblokWebhookSecretSchema = z.string()

defineCredential({
  name: 'storyblokWebhookSecret',
  displayName: 'Storyblok Webhook Secret',
  description: "The webhook's secret",
  type: 'singleton',
  schema: storyblokWebhookSecretSchema,
})
