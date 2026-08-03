import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const servicenowBaseUrlSchema = z.enum(["https://instance.service-now.com/api"]).default("https://instance.service-now.com/api")

defineVariable({
  name: 'SERVICENOW_BASE_URL',
  displayName: 'ServiceNow Base URL',
  description: 'The base URL for the ServiceNow API.',
  variableId: 'SERVICENOW_BASE_URL',
  schema: servicenowBaseUrlSchema,
})
