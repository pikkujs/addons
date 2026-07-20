import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const qdrantApiKeySchema = z
  .string()
  .optional()
  .describe('Qdrant Cloud API key (omit for an unauthenticated local Qdrant)')

export type QdrantApiKey = z.infer<typeof qdrantApiKeySchema>

wireSecret({
  name: 'apiKey',
  displayName: 'Qdrant API Key',
  description: 'API key for Qdrant Cloud',
  secretId: 'QDRANT_API_KEY',
  schema: qdrantApiKeySchema,
})
