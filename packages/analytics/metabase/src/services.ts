import { MetabaseService } from './metabase-api.service.js'
import type { MetabaseSecrets } from './metabase.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecret<MetabaseSecrets>('METABASE_CREDENTIALS')
  const metabase = new MetabaseService(creds)

  return { metabase }
})
