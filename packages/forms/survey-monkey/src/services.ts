import { SurveyMonkeyService } from './survey-monkey-api.service.js'
import type { SurveyMonkeyCredentials } from './survey-monkey.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecretJSON<SurveyMonkeyCredentials>('SURVEY_MONKEY_CREDENTIALS')
  const surveyMonkey = new SurveyMonkeyService(creds)

  return { surveyMonkey }
})
