import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const uprocBaseUrlSchema = z.enum(["https://api.uproc.io/api/v2"]).default("https://api.uproc.io/api/v2")

wireVariable({
  name: 'UPROC_BASE_URL',
  displayName: 'uProc Base URL',
  description: 'The base URL for the uProc API.',
  variableId: 'UPROC_BASE_URL',
  schema: uprocBaseUrlSchema,
})
