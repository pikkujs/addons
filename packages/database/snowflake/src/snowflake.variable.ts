import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const snowflakeBaseUrlSchema = z.enum(["https://account.snowflakecomputing.com/api/v2"]).default("https://account.snowflakecomputing.com/api/v2")

defineVariable({
  name: 'SNOWFLAKE_BASE_URL',
  displayName: 'Snowflake Base URL',
  description: 'The base URL for the Snowflake API.',
  variableId: 'SNOWFLAKE_BASE_URL',
  schema: snowflakeBaseUrlSchema,
})
