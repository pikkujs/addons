import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const wiseBaseUrlSchema = z.enum(["https://api.transferwise.com"]).default("https://api.transferwise.com")

defineVariable({
  name: 'WISE_BASE_URL',
  displayName: 'Wise Base URL',
  description: 'The base URL for the Wise API.',
  variableId: 'WISE_BASE_URL',
  schema: wiseBaseUrlSchema,
})
