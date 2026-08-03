import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const awsComprehendCredentialSchema = z.object({
  apiKey: z.string().describe('AWS Comprehend API key'),
})

defineCredential({
  name: 'awsComprehend',
  displayName: 'AWS Comprehend',
  description: 'Amazon Comprehend text analysis for Pikku',
  type: 'wire',
  schema: awsComprehendCredentialSchema,
})
