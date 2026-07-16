import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const philipsHueCredentialSchema = z.object({
  apiKey: z.string().describe('philipshue API key'),
})

wireCredential({
  name: 'philipsHue',
  displayName: 'philipshue',
  description: 'philipshue addon',
  type: 'wire',
  schema: philipsHueCredentialSchema,
})
