import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const googleSheetsBaseUrlSchema = z.enum(["https://sheets.googleapis.com/"]).default("https://sheets.googleapis.com/")

defineVariable({
  name: 'GOOGLE_SHEETS_BASE_URL',
  displayName: 'Google Sheets Base URL',
  description: 'The base URL for the Google Sheets API.',
  variableId: 'GOOGLE_SHEETS_BASE_URL',
  schema: googleSheetsBaseUrlSchema,
})
