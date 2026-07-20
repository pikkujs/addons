import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const pineconeApiKeySchema = z.string().describe('Pinecone API key')

export type PineconeApiKey = z.infer<typeof pineconeApiKeySchema>

wireSecret({
  name: 'apiKey',
  displayName: 'Pinecone API Key',
  description: 'API key for Pinecone',
  secretId: 'PINECONE_API_KEY',
  schema: pineconeApiKeySchema,
})
