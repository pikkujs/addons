import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const microsoftTeamsBaseUrlSchema = z.enum(["https://graph.microsoft.com/v1.0"]).default("https://graph.microsoft.com/v1.0")

defineVariable({
  name: 'MICROSOFT_TEAMS_BASE_URL',
  displayName: 'Microsoft Teams Base URL',
  description: 'The base URL for the Microsoft Teams API.',
  variableId: 'MICROSOFT_TEAMS_BASE_URL',
  schema: microsoftTeamsBaseUrlSchema,
})
