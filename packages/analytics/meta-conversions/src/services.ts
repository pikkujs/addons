import { MetaConversionsService } from './meta-conversions-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecret('META_CONVERSIONS_CREDENTIALS')
  const metaConversions = new MetaConversionsService(creds)

  return { metaConversions }
})
