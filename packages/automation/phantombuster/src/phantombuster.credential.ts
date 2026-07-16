import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const phantombusterCredentialSchema = z.object({
  apiKey: z.string().describe('Phantombuster API key'),
})

wireCredential({
  name: 'phantombuster',
  displayName: 'Phantombuster',
  description: 'Consume the Phantombuster API to launch and manage agents',
  type: 'wire',
  schema: phantombusterCredentialSchema,
})
