import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'
import { defineVariable } from '@pikku/core/variable'

export const mandrillWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Mandrill Webhook Secret',
  description: "The webhook's key",
  secretId: 'MANDRILL_WEBHOOK_KEY',
  schema: mandrillWebhookSecretSchema,
})

export const mandrillWebhookUrlSchema = z.string()

defineVariable({
  name: 'mandrill_webhook_url',
  displayName: 'Mandrill Webhook URL',
  description: "The webhook URL exactly as registered with Mandrill, which it signs",
  variableId: 'MANDRILL_WEBHOOK_URL',
  schema: mandrillWebhookUrlSchema,
})
