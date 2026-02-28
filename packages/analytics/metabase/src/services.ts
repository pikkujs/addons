import { MetabaseService } from './metabase-api.service.js'
import type { MetabaseSecrets } from './metabase.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecretJSON<MetabaseSecrets>('METABASE_CREDENTIALS')
  const metabase = new MetabaseService(creds)

  return { metabase }
})
