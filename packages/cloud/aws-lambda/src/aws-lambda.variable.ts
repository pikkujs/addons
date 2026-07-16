import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const awsLambdaBaseUrlSchema = z.enum(["https://lambda.local"]).default("https://lambda.local")

wireVariable({
  name: 'AWS_LAMBDA_BASE_URL',
  displayName: 'awslambda Base URL',
  description: 'The base URL for the awslambda API.',
  variableId: 'AWS_LAMBDA_BASE_URL',
  schema: awsLambdaBaseUrlSchema,
})
