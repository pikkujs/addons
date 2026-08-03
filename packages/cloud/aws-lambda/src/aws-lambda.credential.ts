import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const awsLambdaCredentialSchema = z.object({
  apiKey: z.string().describe('awslambda API key'),
})

defineCredential({
  name: 'awsLambda',
  displayName: 'awslambda',
  description: 'awslambda addon',
  type: 'wire',
  schema: awsLambdaCredentialSchema,
})
