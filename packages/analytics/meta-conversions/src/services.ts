import { MetaConversionsService } from './meta-conversions-api.service.js'
import type { MetaConversionsSecrets } from './meta-conversions.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecretJSON<MetaConversionsSecrets>('META_CONVERSIONS_CREDENTIALS')
  const metaConversions = new MetaConversionsService(creds)

  return { metaConversions }
})
