import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const surveyMonkeyWebhookSecretSchema = z.string()

defineCredential({
  name: 'surveyMonkeyWebhookSecret',
  displayName: 'SurveyMonkey Webhook Secret',
  description: "The key SurveyMonkey signs webhooks with: '<client_id>&<client_secret>'",
  type: 'singleton',
  schema: surveyMonkeyWebhookSecretSchema,
})
