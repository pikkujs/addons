import { createClient } from '@supabase/supabase-js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecret('SUPABASE_CREDENTIALS')
  const supabase = createClient(creds.url, creds.apiKey)

  return { supabase }
})
