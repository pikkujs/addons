import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const philipsHueCredentialSchema = z.object({
  apiKey: z.string().describe('philipshue API key'),
})

defineCredential({
  name: 'philipsHue',
  displayName: 'philipshue',
  description: 'philipshue addon',
  type: 'wire',
  schema: philipsHueCredentialSchema,
})
