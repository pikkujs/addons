import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const freshdeskBaseUrlSchema = z.enum(["https://domain.freshdesk.com/api/v2"]).default("https://domain.freshdesk.com/api/v2")

wireVariable({
  name: 'FRESHDESK_BASE_URL',
  displayName: 'Freshdesk Base URL',
  description: 'The base URL for the Freshdesk API.',
  variableId: 'FRESHDESK_BASE_URL',
  schema: freshdeskBaseUrlSchema,
})
