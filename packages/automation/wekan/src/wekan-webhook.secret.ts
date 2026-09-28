import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const wekanWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Wekan Webhook Secret',
  description: "A token of your choosing, added to the outgoing webhook URL as ?token=",
  secretId: 'WEKAN_WEBHOOK_TOKEN',
  schema: wekanWebhookSecretSchema,
})
