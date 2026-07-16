import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const quickchartCredentialSchema = z.object({
  apiKey: z.string().describe('QuickChart API key'),
})

wireCredential({
  name: 'quickchart',
  displayName: 'QuickChart',
  description: 'Create chart images via the QuickChart API',
  type: 'wire',
  schema: quickchartCredentialSchema,
})
