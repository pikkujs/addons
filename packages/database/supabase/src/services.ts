import { createClient } from '@supabase/supabase-js'
import type { SupabaseSecrets } from './supabase.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<SupabaseSecrets>('SUPABASE_CREDENTIALS')
  const supabase = createClient(creds.url, creds.apiKey)

  return { supabase }
})
