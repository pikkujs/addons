import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const segmentSecretsSchema = z.object({
  apiKey: z.string().describe('Segment API key'),
  // Add other secret fields as needed
})

export type SegmentSecrets = z.infer<typeof segmentSecretsSchema>

defineSecret({
  name: 'segment',
  displayName: 'Segment API',
  description: 'Customer data platform',
  secretId: 'SEGMENT_CREDENTIALS',
  schema: segmentSecretsSchema,
})
