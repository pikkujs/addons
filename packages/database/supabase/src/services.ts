import { createClient } from '@supabase/supabase-js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, aiEmbedding }) => {
  const creds = (await secrets.getSecret('SUPABASE_CREDENTIALS')).reveal()
  const supabase = createClient(creds.url, creds.apiKey)

  return { supabase, aiEmbedding }
})
