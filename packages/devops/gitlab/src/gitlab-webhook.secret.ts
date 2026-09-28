import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const gitlabWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'GitLab Webhook Secret',
  description: "The secret token set on the GitLab webhook, which GitLab sends in X-Gitlab-Token",
  secretId: 'GITLAB_WEBHOOK_TOKEN',
  schema: gitlabWebhookSecretSchema,
})
