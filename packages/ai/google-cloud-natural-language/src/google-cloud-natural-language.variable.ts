import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const googleCloudNaturalLanguageBaseUrlSchema = z.enum(["https://language.googleapis.com/v1"]).default("https://language.googleapis.com/v1")

wireVariable({
  name: 'GOOGLE_CLOUD_NATURAL_LANGUAGE_BASE_URL',
  displayName: 'Google Cloud Natural Language Base URL',
  description: 'The base URL for the Google Cloud Natural Language API.',
  variableId: 'GOOGLE_CLOUD_NATURAL_LANGUAGE_BASE_URL',
  schema: googleCloudNaturalLanguageBaseUrlSchema,
})
