import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const awsSnsCredentialSchema = z.object({
  apiKey: z.string().describe('awssns API key'),
})

defineCredential({
  name: 'awsSns',
  displayName: 'awssns',
  description: 'awssns addon',
  type: 'wire',
  schema: awsSnsCredentialSchema,
})
