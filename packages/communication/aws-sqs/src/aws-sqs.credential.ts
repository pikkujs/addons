import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const awsSqsCredentialSchema = z.object({
  apiKey: z.string().describe('awssqs API key'),
})

wireCredential({
  name: 'awsSqs',
  displayName: 'awssqs',
  description: 'awssqs addon',
  type: 'wire',
  schema: awsSqsCredentialSchema,
})
