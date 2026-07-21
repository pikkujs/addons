import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const keapBaseUrlSchema = z.enum(["https://api.infusionsoft.com/crm/rest/v1"]).default("https://api.infusionsoft.com/crm/rest/v1")

wireVariable({
  name: 'KEAP_BASE_URL',
  displayName: 'Keap Base URL',
  description: 'The base URL for the Keap API.',
  variableId: 'KEAP_BASE_URL',
  schema: keapBaseUrlSchema,
})
