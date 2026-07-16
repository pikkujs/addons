import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const airtopBaseUrlSchema = z.enum(["https://api.airtop.ai/api/v1"]).default("https://api.airtop.ai/api/v1")

wireVariable({
  name: 'AIRTOP_BASE_URL',
  displayName: 'Airtop Base URL',
  description: 'The base URL for the Airtop API.',
  variableId: 'AIRTOP_BASE_URL',
  schema: airtopBaseUrlSchema,
})
