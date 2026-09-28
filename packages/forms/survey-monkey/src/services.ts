import { WebhookSigningSecret } from '@pikku/core/hmac'
import { SurveyMonkeyService } from './survey-monkey-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = (await secrets.getSecret('SURVEY_MONKEY_CREDENTIALS')).reveal()
  const surveyMonkey = new SurveyMonkeyService(creds)

  const surveyMonkeyWebhookSecret = new WebhookSigningSecret(
    'SurveyMonkey',
    await secrets
      .getSecret('SURVEY_MONKEY_WEBHOOK_KEY')
      .then((secret) => secret.reveal())
      .catch(() => null)
  )


  return { surveyMonkey, surveyMonkeyWebhookSecret }
})
