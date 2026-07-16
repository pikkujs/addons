import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const baserowBaseUrlSchema = z.enum(["https://api.baserow.io"]).default("https://api.baserow.io")

wireVariable({
  name: 'BASEROW_BASE_URL',
  displayName: 'Baserow Base URL',
  description: 'The base URL for the Baserow API.',
  variableId: 'BASEROW_BASE_URL',
  schema: baserowBaseUrlSchema,
})
