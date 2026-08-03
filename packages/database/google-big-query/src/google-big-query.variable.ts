import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const googleBigQueryBaseUrlSchema = z.enum(["https://bigquery.googleapis.com/bigquery"]).default("https://bigquery.googleapis.com/bigquery")

defineVariable({
  name: 'GOOGLE_BIG_QUERY_BASE_URL',
  displayName: 'Google BigQuery Base URL',
  description: 'The base URL for the Google BigQuery API.',
  variableId: 'GOOGLE_BIG_QUERY_BASE_URL',
  schema: googleBigQueryBaseUrlSchema,
})
