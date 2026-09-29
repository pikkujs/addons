import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const githubWebhookSecretSchema = z.string()

defineCredential({
  name: 'githubWebhookSecret',
  displayName: 'GitHub Webhook Secret',
  description: "The secret set on the GitHub webhook, which GitHub signs each delivery with",
  type: 'singleton',
  schema: githubWebhookSecretSchema,
})
