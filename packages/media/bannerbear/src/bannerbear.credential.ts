import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const bannerbearCredentialSchema = z.object({
  token: z.string().describe('Bannerbear bearer token'),
})

wireCredential({
  name: 'bannerbear',
  displayName: 'Bannerbear',
  description: 'Generate images from templates with the Bannerbear API',
  type: 'wire',
  schema: bannerbearCredentialSchema,
})
