import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'
import { defineVariable } from '@pikku/core/variable'

export const trelloWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Trello Webhook Secret',
  description: "The app's OAuth secret, which Trello signs webhooks with",
  secretId: 'TRELLO_WEBHOOK_SECRET',
  schema: trelloWebhookSecretSchema,
})

export const trelloWebhookUrlSchema = z.string()

defineVariable({
  name: 'trello_webhook_url',
  displayName: 'Trello Webhook URL',
  description: "The callback URL exactly as registered with Trello, which it signs",
  variableId: 'TRELLO_WEBHOOK_URL',
  schema: trelloWebhookUrlSchema,
})
