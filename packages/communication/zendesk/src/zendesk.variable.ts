import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const zendeskBaseUrlSchema = z.enum(["https://{subdomain}.{domain}.com"]).default("https://{subdomain}.{domain}.com")

wireVariable({
  name: 'ZENDESK_BASE_URL',
  displayName: 'Zendesk Base URL',
  description: 'The base URL for the Zendesk API.',
  variableId: 'ZENDESK_BASE_URL',
  schema: zendeskBaseUrlSchema,
})
