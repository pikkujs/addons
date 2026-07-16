import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const egoiBaseUrlSchema = z.enum(["https://api.egoiapp.com"]).default("https://api.egoiapp.com")

wireVariable({
  name: 'EGOI_BASE_URL',
  displayName: 'E-goi Base URL',
  description: 'The base URL for the E-goi API.',
  variableId: 'EGOI_BASE_URL',
  schema: egoiBaseUrlSchema,
})
