import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const upleadBaseUrlSchema = z.enum(["https://api.uplead.com/v2"]).default("https://api.uplead.com/v2")

defineVariable({
  name: 'UPLEAD_BASE_URL',
  displayName: 'uplead Base URL',
  description: 'The base URL for the uplead API.',
  variableId: 'UPLEAD_BASE_URL',
  schema: upleadBaseUrlSchema,
})
