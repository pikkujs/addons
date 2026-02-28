import { CloudflareService } from './cloudflare-api.service.js'
import type { CloudflareSecrets } from './cloudflare.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<CloudflareSecrets>('CLOUDFLARE_CREDENTIALS')
  const cloudflare = new CloudflareService(creds)

  return { cloudflare }
})
