import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const agileCrmBaseUrlSchema = z.enum(["https://subdomain.agilecrm.com/dev"]).default("https://subdomain.agilecrm.com/dev")

wireVariable({
  name: 'AGILE_CRM_BASE_URL',
  displayName: 'Agile CRM Base URL',
  description: 'The base URL for the Agile CRM API.',
  variableId: 'AGILE_CRM_BASE_URL',
  schema: agileCrmBaseUrlSchema,
})
