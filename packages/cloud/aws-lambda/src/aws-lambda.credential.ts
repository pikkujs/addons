import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const awsLambdaCredentialSchema = z.object({
  apiKey: z.string().describe('awslambda API key'),
})

wireCredential({
  name: 'awsLambda',
  displayName: 'awslambda',
  description: 'awslambda addon',
  type: 'wire',
  schema: awsLambdaCredentialSchema,
})
