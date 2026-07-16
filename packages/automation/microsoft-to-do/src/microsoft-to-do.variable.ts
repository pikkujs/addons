import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const microsoftToDoBaseUrlSchema = z.enum(["https://graph.microsoft.com/v1.0"]).default("https://graph.microsoft.com/v1.0")

wireVariable({
  name: 'MICROSOFT_TO_DO_BASE_URL',
  displayName: 'Microsoft To Do Base URL',
  description: 'The base URL for the Microsoft To Do API.',
  variableId: 'MICROSOFT_TO_DO_BASE_URL',
  schema: microsoftToDoBaseUrlSchema,
})
