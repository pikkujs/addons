import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const microsoftOutlookBaseUrlSchema = z.enum(["https://graph.microsoft.com/v1.0/"]).default("https://graph.microsoft.com/v1.0/")

wireVariable({
  name: 'MICROSOFT_OUTLOOK_BASE_URL',
  displayName: 'Microsoft Outlook Base URL',
  description: 'The base URL for the Microsoft Outlook API.',
  variableId: 'MICROSOFT_OUTLOOK_BASE_URL',
  schema: microsoftOutlookBaseUrlSchema,
})
