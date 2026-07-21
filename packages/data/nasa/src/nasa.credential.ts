import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const nasaCredentialSchema = z.object({
  apiKey: z.string().describe('NASA API key'),
})

wireCredential({
  name: 'nasa',
  displayName: 'NASA',
  description: 'Retrieve data from the NASA API',
  type: 'wire',
  schema: nasaCredentialSchema,
})
