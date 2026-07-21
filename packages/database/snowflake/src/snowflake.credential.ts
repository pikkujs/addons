import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const snowflakeCredentialSchema = z.object({
  apiKey: z.string().describe('Snowflake API key'),
})

wireCredential({
  name: 'snowflake',
  displayName: 'Snowflake',
  description: 'Run SQL queries, insert and update rows in Snowflake',
  type: 'wire',
  schema: snowflakeCredentialSchema,
})
