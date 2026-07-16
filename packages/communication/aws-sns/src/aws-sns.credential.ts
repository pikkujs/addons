import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const awsSnsCredentialSchema = z.object({
  apiKey: z.string().describe('awssns API key'),
})

wireCredential({
  name: 'awsSns',
  displayName: 'awssns',
  description: 'awssns addon',
  type: 'wire',
  schema: awsSnsCredentialSchema,
})
