import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const googleDocsBaseUrlSchema = z.enum(["https://docs.googleapis.com/"]).default("https://docs.googleapis.com/")

wireVariable({
  name: 'GOOGLE_DOCS_BASE_URL',
  displayName: 'Google Docs Base URL',
  description: 'The base URL for the Google Docs API.',
  variableId: 'GOOGLE_DOCS_BASE_URL',
  schema: googleDocsBaseUrlSchema,
})
