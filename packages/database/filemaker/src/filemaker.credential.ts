import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const filemakerCredentialSchema = z.object({
  apiKey: z.string().describe('FileMaker API key'),
})

wireCredential({
  name: 'filemaker',
  displayName: 'FileMaker',
  description: 'Retrieve and manage data via the FileMaker Data API',
  type: 'wire',
  schema: filemakerCredentialSchema,
})
