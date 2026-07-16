import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const quickbaseBaseUrlSchema = z.enum(["https://api.quickbase.com/v1"]).default("https://api.quickbase.com/v1")

wireVariable({
  name: 'QUICKBASE_BASE_URL',
  displayName: 'Quick Base Base URL',
  description: 'The base URL for the Quick Base API.',
  variableId: 'QUICKBASE_BASE_URL',
  schema: quickbaseBaseUrlSchema,
})
