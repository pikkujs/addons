import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const matrixCredentialSchema = z.object({
  token: z.string().describe('Matrix bearer token'),
})

defineCredential({
  name: 'matrix',
  displayName: 'Matrix',
  description: 'Consume the Matrix chat API',
  type: 'wire',
  schema: matrixCredentialSchema,
})
