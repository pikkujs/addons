import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const pagerdutyWebhookSecretSchema = z.string()

defineCredential({
  name: 'pagerdutyWebhookSecret',
  displayName: 'PagerDuty Webhook Secret',
  description: "The webhook subscription's secret",
  type: 'singleton',
  schema: pagerdutyWebhookSecretSchema,
})
