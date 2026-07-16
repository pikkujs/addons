import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const microsoftSqlCredentialSchema = z.object({
  apiKey: z.string().describe('microsoftsql API key'),
})

wireCredential({
  name: 'microsoftSql',
  displayName: 'microsoftsql',
  description: 'microsoftsql addon',
  type: 'wire',
  schema: microsoftSqlCredentialSchema,
})
