import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const salesforceBaseUrlSchema = z.enum(["https://yourInstance.salesforce.com/services/data/v59.0"]).default("https://yourInstance.salesforce.com/services/data/v59.0")

defineVariable({
  name: 'SALESFORCE_BASE_URL',
  displayName: 'Salesforce Base URL',
  description: 'The base URL for the Salesforce API.',
  variableId: 'SALESFORCE_BASE_URL',
  schema: salesforceBaseUrlSchema,
})
