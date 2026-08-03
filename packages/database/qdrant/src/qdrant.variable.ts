import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const qdrantUrlSchema = z
  .string()
  .default('http://localhost:6333')
  .describe('Qdrant server URL (REST), e.g. https://xyz.cloud.qdrant.io')

defineVariable({
  name: 'url',
  displayName: 'Qdrant URL',
  description: 'Qdrant server REST endpoint',
  variableId: 'QDRANT_URL',
  schema: qdrantUrlSchema,
})
