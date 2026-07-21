import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const wiseBaseUrlSchema = z.enum(["https://api.transferwise.com"]).default("https://api.transferwise.com")

wireVariable({
  name: 'WISE_BASE_URL',
  displayName: 'Wise Base URL',
  description: 'The base URL for the Wise API.',
  variableId: 'WISE_BASE_URL',
  schema: wiseBaseUrlSchema,
})
