import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const pagerdutyWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'PagerDuty Webhook Secret',
  description: "The webhook subscription's secret",
  secretId: 'PAGERDUTY_WEBHOOK_SECRET',
  schema: pagerdutyWebhookSecretSchema,
})
