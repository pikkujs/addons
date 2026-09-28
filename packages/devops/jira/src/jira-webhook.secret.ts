import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const jiraWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Jira Webhook Secret',
  description: "The secret set on the Jira webhook, which Jira signs each delivery with",
  secretId: 'JIRA_WEBHOOK_SECRET',
  schema: jiraWebhookSecretSchema,
})
