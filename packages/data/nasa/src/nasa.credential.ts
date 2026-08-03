import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const nasaCredentialSchema = z.object({
  apiKey: z.string().describe('NASA API key'),
})

defineCredential({
  name: 'nasa',
  displayName: 'NASA',
  description: 'Retrieve data from the NASA API',
  type: 'wire',
  schema: nasaCredentialSchema,
})
