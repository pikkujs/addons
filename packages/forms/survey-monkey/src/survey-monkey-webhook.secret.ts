import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const surveyMonkeyWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'SurveyMonkey Webhook Secret',
  description: "The key SurveyMonkey signs webhooks with: '<client_id>&<client_secret>'",
  secretId: 'SURVEY_MONKEY_WEBHOOK_KEY',
  schema: surveyMonkeyWebhookSecretSchema,
})
