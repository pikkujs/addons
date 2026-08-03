import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const microsoftSqlBaseUrlSchema = z.enum(["https://mssql.local"]).default("https://mssql.local")

defineVariable({
  name: 'MICROSOFT_SQL_BASE_URL',
  displayName: 'microsoftsql Base URL',
  description: 'The base URL for the microsoftsql API.',
  variableId: 'MICROSOFT_SQL_BASE_URL',
  schema: microsoftSqlBaseUrlSchema,
})
