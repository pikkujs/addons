import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const freshdeskBaseUrlSchema = z.enum(["https://domain.freshdesk.com/api/v2"]).default("https://domain.freshdesk.com/api/v2")

defineVariable({
  name: 'FRESHDESK_BASE_URL',
  displayName: 'Freshdesk Base URL',
  description: 'The base URL for the Freshdesk API.',
  variableId: 'FRESHDESK_BASE_URL',
  schema: freshdeskBaseUrlSchema,
})
