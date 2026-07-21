import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const googleSheetsBaseUrlSchema = z.enum(["https://sheets.googleapis.com/"]).default("https://sheets.googleapis.com/")

wireVariable({
  name: 'GOOGLE_SHEETS_BASE_URL',
  displayName: 'Google Sheets Base URL',
  description: 'The base URL for the Google Sheets API.',
  variableId: 'GOOGLE_SHEETS_BASE_URL',
  schema: googleSheetsBaseUrlSchema,
})
