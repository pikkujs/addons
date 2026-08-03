import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const zendeskBaseUrlSchema = z.enum(["https://{subdomain}.{domain}.com"]).default("https://{subdomain}.{domain}.com")

defineVariable({
  name: 'ZENDESK_BASE_URL',
  displayName: 'Zendesk Base URL',
  description: 'The base URL for the Zendesk API.',
  variableId: 'ZENDESK_BASE_URL',
  schema: zendeskBaseUrlSchema,
})
