import { MetabaseService } from './metabase-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecret('METABASE_CREDENTIALS')
  const metabase = new MetabaseService(creds)

  return { metabase }
})
