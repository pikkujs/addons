import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const quickchartCredentialSchema = z.object({
  apiKey: z.string().describe('QuickChart API key'),
})

defineCredential({
  name: 'quickchart',
  displayName: 'QuickChart',
  description: 'Create chart images via the QuickChart API',
  type: 'wire',
  schema: quickchartCredentialSchema,
})
