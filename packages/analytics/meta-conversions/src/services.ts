import { MetaConversionsService } from './meta-conversions-api.service.js'
import type { MetaConversionsSecrets } from './meta-conversions.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecretJSON<MetaConversionsSecrets>('META_CONVERSIONS_CREDENTIALS')
  const metaConversions = new MetaConversionsService(creds)

  return { metaConversions }
})
