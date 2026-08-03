import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const surveyMonkeyCredentialsSchema = z.object({
  accessToken: z.string().describe('SurveyMonkey access token'),
})

export type SurveyMonkeyCredentials = z.infer<typeof surveyMonkeyCredentialsSchema>

defineSecret({
  name: 'surveyMonkey',
  displayName: 'SurveyMonkey API',
  description: 'Survey platform',
  secretId: 'SURVEY_MONKEY_CREDENTIALS',
  schema: surveyMonkeyCredentialsSchema,
})
