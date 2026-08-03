import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const awsSnsBaseUrlSchema = z.enum(["https://sns.local"]).default("https://sns.local")

defineVariable({
  name: 'AWS_SNS_BASE_URL',
  displayName: 'awssns Base URL',
  description: 'The base URL for the awssns API.',
  variableId: 'AWS_SNS_BASE_URL',
  schema: awsSnsBaseUrlSchema,
})
