import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const googleDriveBaseUrlSchema = z.enum(["https://www.googleapis.com/drive/v3"]).default("https://www.googleapis.com/drive/v3")

wireVariable({
  name: 'GOOGLE_DRIVE_BASE_URL',
  displayName: 'Google Drive Base URL',
  description: 'The base URL for the Google Drive API.',
  variableId: 'GOOGLE_DRIVE_BASE_URL',
  schema: googleDriveBaseUrlSchema,
})
