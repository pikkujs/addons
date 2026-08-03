import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const microsoftOneDriveBaseUrlSchema = z.enum(["https://graph.microsoft.com/v1.0"]).default("https://graph.microsoft.com/v1.0")

defineVariable({
  name: 'MICROSOFT_ONE_DRIVE_BASE_URL',
  displayName: 'Microsoft OneDrive Base URL',
  description: 'The base URL for the Microsoft OneDrive API.',
  variableId: 'MICROSOFT_ONE_DRIVE_BASE_URL',
  schema: microsoftOneDriveBaseUrlSchema,
})
