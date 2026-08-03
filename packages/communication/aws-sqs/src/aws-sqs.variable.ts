import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const awsSqsBaseUrlSchema = z.enum(["https://sqs.local"]).default("https://sqs.local")

defineVariable({
  name: 'AWS_SQS_BASE_URL',
  displayName: 'awssqs Base URL',
  description: 'The base URL for the awssqs API.',
  variableId: 'AWS_SQS_BASE_URL',
  schema: awsSqsBaseUrlSchema,
})
