import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const strapiWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Strapi Webhook Secret',
  description: "The value of the Authorization header set on the Strapi webhook",
  secretId: 'STRAPI_WEBHOOK_TOKEN',
  schema: strapiWebhookSecretSchema,
})
