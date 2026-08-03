import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const autopilotCredentialSchema = z.object({
  apiKey: z.string().describe('Autopilot API key'),
})

defineCredential({
  name: 'autopilot',
  displayName: 'Autopilot',
  description: 'Consume the Autopilot marketing automation API',
  type: 'wire',
  schema: autopilotCredentialSchema,
})
