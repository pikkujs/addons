import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const pineconeHostSchema = z
  .string()
  .describe(
    'Pinecone index host URL, e.g. https://my-index-abc123.svc.us-east-1-aws.pinecone.io'
  )

wireVariable({
  name: 'host',
  displayName: 'Pinecone Host',
  description: 'Pinecone index host (data-plane) URL',
  variableId: 'PINECONE_HOST',
  schema: pineconeHostSchema,
})
