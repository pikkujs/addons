import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const gitlabWebhookSecretSchema = z.string()

defineCredential({
  name: 'gitlabWebhookSecret',
  displayName: 'GitLab Webhook Secret',
  description: "The secret token set on the GitLab webhook, which GitLab sends in X-Gitlab-Token",
  type: 'singleton',
  schema: gitlabWebhookSecretSchema,
})
