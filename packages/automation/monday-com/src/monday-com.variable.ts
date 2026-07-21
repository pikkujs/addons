import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const mondayComBaseUrlSchema = z.enum(["https://api.monday.com"]).default("https://api.monday.com")

wireVariable({
  name: 'MONDAY_COM_BASE_URL',
  displayName: 'Monday.com Base URL',
  description: 'The base URL for the Monday.com API.',
  variableId: 'MONDAY_COM_BASE_URL',
  schema: mondayComBaseUrlSchema,
})
