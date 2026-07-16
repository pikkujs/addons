import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const microsoftExcelBaseUrlSchema = z.enum(["https://graph.microsoft.com/v1.0"]).default("https://graph.microsoft.com/v1.0")

wireVariable({
  name: 'MICROSOFT_EXCEL_BASE_URL',
  displayName: 'Microsoft Excel (OneDrive) Base URL',
  description: 'The base URL for the Microsoft Excel (OneDrive) API.',
  variableId: 'MICROSOFT_EXCEL_BASE_URL',
  schema: microsoftExcelBaseUrlSchema,
})
