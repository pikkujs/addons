import { createClient } from '@supabase/supabase-js'
import type { SupabaseSecrets } from './supabase.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<SupabaseSecrets>('SUPABASE_CREDENTIALS')
  const supabase = createClient(creds.url, creds.apiKey)

  return { supabase }
})
