import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const dhlBaseUrlSchema = z.enum(["https://api-eu.dhl.com"]).default("https://api-eu.dhl.com")

wireVariable({
  name: 'DHL_BASE_URL',
  displayName: 'DHL Base URL',
  description: 'The base URL for the DHL API.',
  variableId: 'DHL_BASE_URL',
  schema: dhlBaseUrlSchema,
})
