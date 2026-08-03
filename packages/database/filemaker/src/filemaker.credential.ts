import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const filemakerCredentialSchema = z.object({
  apiKey: z.string().describe('FileMaker API key'),
})

defineCredential({
  name: 'filemaker',
  displayName: 'FileMaker',
  description: 'Retrieve and manage data via the FileMaker Data API',
  type: 'wire',
  schema: filemakerCredentialSchema,
})
