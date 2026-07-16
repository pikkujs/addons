import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const awsSesBaseUrlSchema = z.enum(["https://email.us-east-1.amazonaws.com"]).default("https://email.us-east-1.amazonaws.com")

wireVariable({
  name: 'AWS_SES_BASE_URL',
  displayName: 'AWS SES Base URL',
  description: 'The base URL for the AWS SES API.',
  variableId: 'AWS_SES_BASE_URL',
  schema: awsSesBaseUrlSchema,
})
