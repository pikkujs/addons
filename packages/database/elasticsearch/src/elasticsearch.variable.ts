import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const elasticsearchBaseUrlSchema = z.enum(["https://localhost:9200"]).default("https://localhost:9200")

defineVariable({
  name: 'ELASTICSEARCH_BASE_URL',
  displayName: 'Elasticsearch Base URL',
  description: 'The base URL for the Elasticsearch API.',
  variableId: 'ELASTICSEARCH_BASE_URL',
  schema: elasticsearchBaseUrlSchema,
})
