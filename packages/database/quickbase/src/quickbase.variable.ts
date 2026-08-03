import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const quickbaseBaseUrlSchema = z.enum(["https://api.quickbase.com/v1"]).default("https://api.quickbase.com/v1")

defineVariable({
  name: 'QUICKBASE_BASE_URL',
  displayName: 'Quick Base Base URL',
  description: 'The base URL for the Quick Base API.',
  variableId: 'QUICKBASE_BASE_URL',
  schema: quickbaseBaseUrlSchema,
})
