import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const yourlsBaseUrlSchema = z.enum(["https://yourls.local"]).default("https://yourls.local")

defineVariable({
  name: 'YOURLS_BASE_URL',
  displayName: 'Yourls Base URL',
  description: 'The base URL for the Yourls API.',
  variableId: 'YOURLS_BASE_URL',
  schema: yourlsBaseUrlSchema,
})
