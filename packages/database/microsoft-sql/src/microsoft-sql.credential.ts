import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const microsoftSqlCredentialSchema = z.object({
  apiKey: z.string().describe('microsoftsql API key'),
})

defineCredential({
  name: 'microsoftSql',
  displayName: 'microsoftsql',
  description: 'microsoftsql addon',
  type: 'wire',
  schema: microsoftSqlCredentialSchema,
})
