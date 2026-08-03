import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const googleDriveBaseUrlSchema = z.enum(["https://www.googleapis.com/drive/v3"]).default("https://www.googleapis.com/drive/v3")

defineVariable({
  name: 'GOOGLE_DRIVE_BASE_URL',
  displayName: 'Google Drive Base URL',
  description: 'The base URL for the Google Drive API.',
  variableId: 'GOOGLE_DRIVE_BASE_URL',
  schema: googleDriveBaseUrlSchema,
})
