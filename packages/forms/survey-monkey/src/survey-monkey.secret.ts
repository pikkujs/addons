import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const surveyMonkeyCredentialsSchema = z.object({
  accessToken: z.string().describe('SurveyMonkey access token'),
})

export type SurveyMonkeyCredentials = z.infer<typeof surveyMonkeyCredentialsSchema>

wireSecret({
  name: 'surveyMonkey',
  displayName: 'SurveyMonkey API',
  description: 'Survey platform',
  secretId: 'SURVEY_MONKEY_CREDENTIALS',
  schema: surveyMonkeyCredentialsSchema,
})
