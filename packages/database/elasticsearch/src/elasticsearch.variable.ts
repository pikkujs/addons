import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const elasticsearchBaseUrlSchema = z.enum(["https://localhost:9200"]).default("https://localhost:9200")

wireVariable({
  name: 'ELASTICSEARCH_BASE_URL',
  displayName: 'Elasticsearch Base URL',
  description: 'The base URL for the Elasticsearch API.',
  variableId: 'ELASTICSEARCH_BASE_URL',
  schema: elasticsearchBaseUrlSchema,
})
