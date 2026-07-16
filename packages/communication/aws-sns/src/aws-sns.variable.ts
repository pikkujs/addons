import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const awsSnsBaseUrlSchema = z.enum(["https://sns.local"]).default("https://sns.local")

wireVariable({
  name: 'AWS_SNS_BASE_URL',
  displayName: 'awssns Base URL',
  description: 'The base URL for the awssns API.',
  variableId: 'AWS_SNS_BASE_URL',
  schema: awsSnsBaseUrlSchema,
})
