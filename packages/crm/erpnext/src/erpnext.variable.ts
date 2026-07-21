import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const erpnextBaseUrlSchema = z.enum(["https://your-instance.erpnext.com"]).default("https://your-instance.erpnext.com")

wireVariable({
  name: 'ERPNEXT_BASE_URL',
  displayName: 'ERPNext Base URL',
  description: 'The base URL for the ERPNext API.',
  variableId: 'ERPNEXT_BASE_URL',
  schema: erpnextBaseUrlSchema,
})
