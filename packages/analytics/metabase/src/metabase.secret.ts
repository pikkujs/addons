import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const metabaseSecretsSchema = z.object({
  host: z.string().describe('Metabase instance URL (e.g., https://metabase.example.com)'),
  sessionToken: z.string().describe('Metabase session token'),
})

export type MetabaseSecrets = z.infer<typeof metabaseSecretsSchema>

wireSecret({
  name: 'metabase',
  displayName: 'Metabase API',
  description: 'Business intelligence',
  secretId: 'METABASE_CREDENTIALS',
  schema: metabaseSecretsSchema,
})
