import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const googleBigQueryBaseUrlSchema = z.enum(["https://bigquery.googleapis.com/bigquery"]).default("https://bigquery.googleapis.com/bigquery")

wireVariable({
  name: 'GOOGLE_BIG_QUERY_BASE_URL',
  displayName: 'Google BigQuery Base URL',
  description: 'The base URL for the Google BigQuery API.',
  variableId: 'GOOGLE_BIG_QUERY_BASE_URL',
  schema: googleBigQueryBaseUrlSchema,
})
