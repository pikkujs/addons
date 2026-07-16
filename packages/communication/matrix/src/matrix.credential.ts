import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const matrixCredentialSchema = z.object({
  token: z.string().describe('Matrix bearer token'),
})

wireCredential({
  name: 'matrix',
  displayName: 'Matrix',
  description: 'Consume the Matrix chat API',
  type: 'wire',
  schema: matrixCredentialSchema,
})
