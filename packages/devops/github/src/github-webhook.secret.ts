import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const githubWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'GitHub Webhook Secret',
  description: "The secret set on the GitHub webhook, which GitHub signs each delivery with",
  secretId: 'GITHUB_WEBHOOK_SECRET',
  schema: githubWebhookSecretSchema,
})
