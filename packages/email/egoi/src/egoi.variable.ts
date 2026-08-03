import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const egoiBaseUrlSchema = z.enum(["https://api.egoiapp.com"]).default("https://api.egoiapp.com")

defineVariable({
  name: 'EGOI_BASE_URL',
  displayName: 'E-goi Base URL',
  description: 'The base URL for the E-goi API.',
  variableId: 'EGOI_BASE_URL',
  schema: egoiBaseUrlSchema,
})
