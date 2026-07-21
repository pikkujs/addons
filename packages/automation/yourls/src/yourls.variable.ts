import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const yourlsBaseUrlSchema = z.enum(["https://yourls.local"]).default("https://yourls.local")

wireVariable({
  name: 'YOURLS_BASE_URL',
  displayName: 'Yourls Base URL',
  description: 'The base URL for the Yourls API.',
  variableId: 'YOURLS_BASE_URL',
  schema: yourlsBaseUrlSchema,
})
