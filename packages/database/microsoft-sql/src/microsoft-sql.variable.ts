import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const microsoftSqlBaseUrlSchema = z.enum(["https://mssql.local"]).default("https://mssql.local")

wireVariable({
  name: 'MICROSOFT_SQL_BASE_URL',
  displayName: 'microsoftsql Base URL',
  description: 'The base URL for the microsoftsql API.',
  variableId: 'MICROSOFT_SQL_BASE_URL',
  schema: microsoftSqlBaseUrlSchema,
})
