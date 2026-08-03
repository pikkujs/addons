import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const awsSqsCredentialSchema = z.object({
  apiKey: z.string().describe('awssqs API key'),
})

defineCredential({
  name: 'awsSqs',
  displayName: 'awssqs',
  description: 'awssqs addon',
  type: 'wire',
  schema: awsSqsCredentialSchema,
})
