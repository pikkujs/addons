import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const quickbooksBaseUrlSchema = z.enum(["https://quickbooks.api.intuit.com/v3"]).default("https://quickbooks.api.intuit.com/v3")

wireVariable({
  name: 'QUICKBOOKS_BASE_URL',
  displayName: 'QuickBooks Online Base URL',
  description: 'The base URL for the QuickBooks Online API.',
  variableId: 'QUICKBOOKS_BASE_URL',
  schema: quickbooksBaseUrlSchema,
})
