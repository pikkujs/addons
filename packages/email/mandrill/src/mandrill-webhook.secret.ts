import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineVariable } from '@pikku/core/variable'

export const mandrillWebhookSecretSchema = z.string()

defineCredential({
  name: 'mandrillWebhookSecret',
  displayName: 'Mandrill Webhook Secret',
  description: "The webhook's key",
  type: 'singleton',
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
