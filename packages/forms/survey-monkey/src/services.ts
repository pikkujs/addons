import { SurveyMonkeyService } from './survey-monkey-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecret('SURVEY_MONKEY_CREDENTIALS')
  const surveyMonkey = new SurveyMonkeyService(creds)

  return { surveyMonkey }
})
