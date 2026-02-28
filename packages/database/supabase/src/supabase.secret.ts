import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const supabaseSecretsSchema = z.object({
  url: z.string().describe('Supabase Project URL'),
  apiKey: z.string().describe('Supabase API Key (anon or service_role)'),
})

export type SupabaseSecrets = z.infer<typeof supabaseSecretsSchema>

wireSecret({
  name: 'secrets',
  displayName: 'Supabase Secrets',
  description: 'Supabase project URL and API key',
  secretId: 'SUPABASE_CREDENTIALS',
  schema: supabaseSecretsSchema,
})
