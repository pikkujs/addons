import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const wiseCredentialSchema = z.object({
  token: z.string().describe('Wise bearer token'),
})

defineCredential({
  name: 'wise',
  displayName: 'Wise',
  description: 'Consume the Wise (TransferWise) payments API',
  type: 'wire',
  schema: wiseCredentialSchema,
})
