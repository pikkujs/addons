import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const convertkitWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Kit Webhook Secret',
  description: "A token of your choosing, added to the webhook URL as ?token=",
  secretId: 'CONVERTKIT_WEBHOOK_TOKEN',
  schema: convertkitWebhookSecretSchema,
})
