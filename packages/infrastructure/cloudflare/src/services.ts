import { CloudflareService } from './cloudflare-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecret('CLOUDFLARE_CREDENTIALS')
  const cloudflare = new CloudflareService(creds)

  return { cloudflare }
})
