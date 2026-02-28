import { SurveyMonkeyService } from './survey-monkey-api.service.js'
import type { SurveyMonkeyCredentials } from './survey-monkey.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecretJSON<SurveyMonkeyCredentials>('SURVEY_MONKEY_CREDENTIALS')
  const surveyMonkey = new SurveyMonkeyService(creds)

  return { surveyMonkey }
})
