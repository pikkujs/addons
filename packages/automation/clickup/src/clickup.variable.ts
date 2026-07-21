import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const clickupBaseUrlSchema = z.enum(["https://api.clickup.com/api/v2"]).default("https://api.clickup.com/api/v2")

wireVariable({
  name: 'CLICKUP_BASE_URL',
  displayName: 'ClickUp Base URL',
  description: 'The base URL for the ClickUp API.',
  variableId: 'CLICKUP_BASE_URL',
  schema: clickupBaseUrlSchema,
})
