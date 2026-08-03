import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const awsComprehendBaseUrlSchema = z.enum(["https://comprehend.us-east-1.amazonaws.com"]).default("https://comprehend.us-east-1.amazonaws.com")

defineVariable({
  name: 'AWS_COMPREHEND_BASE_URL',
  displayName: 'AWS Comprehend Base URL',
  description: 'The base URL for the AWS Comprehend API.',
  variableId: 'AWS_COMPREHEND_BASE_URL',
  schema: awsComprehendBaseUrlSchema,
})
