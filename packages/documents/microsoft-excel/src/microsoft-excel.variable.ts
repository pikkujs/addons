import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const microsoftExcelBaseUrlSchema = z.enum(["https://graph.microsoft.com/v1.0"]).default("https://graph.microsoft.com/v1.0")

defineVariable({
  name: 'MICROSOFT_EXCEL_BASE_URL',
  displayName: 'Microsoft Excel (OneDrive) Base URL',
  description: 'The base URL for the Microsoft Excel (OneDrive) API.',
  variableId: 'MICROSOFT_EXCEL_BASE_URL',
  schema: microsoftExcelBaseUrlSchema,
})
