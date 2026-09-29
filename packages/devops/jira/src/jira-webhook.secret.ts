import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const jiraWebhookSecretSchema = z.string()

defineCredential({
  name: 'jiraWebhookSecret',
  displayName: 'Jira Webhook Secret',
  description: "The secret set on the Jira webhook, which Jira signs each delivery with",
  type: 'singleton',
  schema: jiraWebhookSecretSchema,
})
