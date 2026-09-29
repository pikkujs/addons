import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const strapiWebhookSecretSchema = z.string()

defineCredential({
  name: 'strapiWebhookSecret',
  displayName: 'Strapi Webhook Secret',
  description: "The value of the Authorization header set on the Strapi webhook",
  type: 'singleton',
  schema: strapiWebhookSecretSchema,
})
