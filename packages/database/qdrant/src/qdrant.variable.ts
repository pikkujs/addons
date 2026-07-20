import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const qdrantUrlSchema = z
  .string()
  .default('http://localhost:6333')
  .describe('Qdrant server URL (REST), e.g. https://xyz.cloud.qdrant.io')

wireVariable({
  name: 'url',
  displayName: 'Qdrant URL',
  description: 'Qdrant server REST endpoint',
  variableId: 'QDRANT_URL',
  schema: qdrantUrlSchema,
})
